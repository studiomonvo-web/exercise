import React, { useState, useEffect, useRef } from 'react';
import { LIVE_CHAT_SCENARIOS } from '../../data/mockDatabase';
import { ChatMessage } from '../../types/academy';
import { 
  Send, 
  Clock, 
  User, 
  RefreshCw
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';

export const LiveChatSimulator: React.FC = () => {
  const { currentUser } = useAcademy();
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const scenario = LIVE_CHAT_SCENARIOS[selectedScenarioIndex];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isCustomerTyping, setIsCustomerTyping] = useState<boolean>(false);
  const [sentimentScore, setSentimentScore] = useState<number>(0);
  const [sessionResolved, setSessionResolved] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: `sys-${Date.now()}`,
        sender: 'system',
        text: `Chat session initiated with ${scenario.customerName} (${scenario.customerTier}). Priority: Standard Live Queue.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `cust-${Date.now()}`,
        sender: 'customer',
        text: scenario.initialMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setSentimentScore(scenario.customerPersonality === 'Angry' ? -1 : 0);
    setSessionResolved(false);
    setElapsedSeconds(0);
  }, [selectedScenarioIndex]);

  useEffect(() => {
    if (sessionResolved) return;
    const timer = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionResolved]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isCustomerTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || sessionResolved) return;

    const userText = inputText.trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTraineeMsg: ChatMessage = {
      id: `trainee-${Date.now()}`,
      sender: 'trainee',
      text: userText,
      timestamp: nowTime
    };

    setMessages(prev => [...prev, newTraineeMsg]);
    setInputText('');
    setIsCustomerTyping(true);

    setTimeout(() => {
      setIsCustomerTyping(false);
      const lower = userText.toLowerCase();

      let matchedResponse = scenario.potentialResponses.find(pr =>
        pr.traineeInputKeywords.some(kw => lower.includes(kw))
      );

      let replyContent = "";
      let shift = 0;

      if (matchedResponse) {
        replyContent = matchedResponse.customerReply;
        shift = matchedResponse.sentimentShift;
      } else {
        if (lower.length > 50) {
          replyContent = `Thank you for the detailed information. I appreciate you taking the time to explain this. Can you confirm when this resolution will reflect on my account?`;
          shift = 1;
        } else {
          replyContent = `Could you please clarify? I want to make sure this is handled properly per your policy.`;
          shift = 0;
        }
      }

      setSentimentScore(prev => Math.max(-2, Math.min(2, prev + shift)));

      const newCustMsg: ChatMessage = {
        id: `cust-${Date.now()}`,
        sender: 'customer',
        text: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newCustMsg]);

      if (shift > 0) {
        setTimeout(() => {
          setSessionResolved(true);
        }, 1200);
      }
    }, 1500);
  };

  const getSentimentText = () => {
    if (sentimentScore >= 1) return "Sentiment: Satisfied";
    if (sentimentScore <= -1) return "Sentiment: Impatient / Agitated";
    return "Sentiment: Neutral";
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-5">
      {/* Top Banner with Indonesian Slug in Top Right */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Nexora Live Chat Simulation Room</h1>
            <p className="text-xs text-neutral-600">Practice customer conversations with dynamic sentiment tracking and SLA response timings</p>
          </div>

          {/* Indonesian Slug in Top Right */}
          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="chat" />
          </div>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {LIVE_CHAT_SCENARIOS.map((scen, idx) => (
            <button
              key={scen.id}
              onClick={() => setSelectedScenarioIndex(idx)}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                selectedScenarioIndex === idx
                  ? 'bg-black text-white font-semibold'
                  : 'text-black hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Skenario {idx + 1}: {scen.customerName.split(' ')[0]} ({scen.issue})
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Customer Dossier (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 p-4 space-y-3 text-xs text-black">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <h3 className="font-bold text-black uppercase tracking-wide">
              Customer Dossier
            </h3>
            <span className="font-mono text-[11px] text-neutral-600">
              [{scenario.customerTier}]
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="font-semibold text-black">
              {scenario.customerName}
            </div>
            <div className="text-neutral-600 font-mono text-[11px]">{scenario.customerEmail}</div>
            <div className="p-2.5 bg-neutral-50 border border-neutral-200 space-y-0.5">
              <span className="font-semibold block">Reported Issue:</span>
              <span className="text-black font-normal">{scenario.issue}</span>
            </div>
            <div className="p-2.5 bg-neutral-50 border border-neutral-200 space-y-0.5">
              <span className="font-semibold block">Target Goal:</span>
              <span className="text-black font-normal">{scenario.resolutionGoal}</span>
            </div>
          </div>

          {/* Quick Macros */}
          <div className="pt-2 border-t border-neutral-200 space-y-1.5">
            <span className="font-bold text-black uppercase tracking-wider block text-[11px]">
              Standard Macros
            </span>
            <div className="space-y-1">
              <button
                onClick={() => setInputText("Hello! Thank you for reaching out to Nexora. I understand your frustration and I am taking personal ownership to resolve this right away.")}
                className="w-full text-left p-2 border border-neutral-200 hover:bg-neutral-100 text-[11px] text-black transition-colors"
              >
                1. Empathic Opening (HEAT)
              </button>
              <button
                onClick={() => setInputText("I have checked the order details in our system. Per our policy, I can authorize a replacement or store credit exception for you today.")}
                className="w-full text-left p-2 border border-neutral-200 hover:bg-neutral-100 text-[11px] text-black transition-colors"
              >
                2. Exception Authorization Offer
              </button>
              <button
                onClick={() => setInputText("Thank you so much for your patience! I have processed the change and updated your file. Is there anything else I can assist with today?")}
                className="w-full text-left p-2 border border-neutral-200 hover:bg-neutral-100 text-[11px] text-black transition-colors"
              >
                3. Professional Close & CSAT Wrap-up
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Chat Window (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 flex flex-col h-[560px] overflow-hidden">
          {/* Top Bar */}
          <div className="px-4 py-3 bg-black text-white flex items-center justify-between shrink-0">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">Live Session: {scenario.customerName}</h4>
              <p className="text-[10px] text-neutral-400">Agent: {currentUser.name} • Queue #2</p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1 text-neutral-300">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(elapsedSeconds)}</span>
              </div>
              <span className="border border-neutral-700 px-2 py-0.5 text-neutral-200 text-[11px]">
                {getSentimentText()}
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50/50">
            {messages.map(msg => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="text-center my-2">
                    <span className="px-2.5 py-0.5 border border-neutral-200 bg-white text-neutral-600 text-[10px] font-mono">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              const isTrainee = msg.sender === 'trainee';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isTrainee ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1 text-[10px] text-neutral-500 mb-0.5 font-mono">
                    <span>{isTrainee ? currentUser.name : scenario.customerName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-[80%] p-3 text-xs leading-relaxed ${
                      isTrainee
                        ? 'bg-black text-white'
                        : 'bg-white border border-neutral-300 text-black'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isCustomerTyping && (
              <div className="text-xs text-neutral-500 italic py-1 text-[11px]">
                {scenario.customerName} is typing response...
              </div>
            )}

            {sessionResolved && (
              <div className="p-3 bg-white border border-neutral-400 text-center space-y-1 my-2">
                <h5 className="font-bold text-xs text-black uppercase tracking-wide">
                  Live Chat Simulation Concluded
                </h5>
                <p className="text-[11px] text-neutral-800">
                  Customer CSAT Rating: <strong>5 / 5 Stars</strong>. Handle Time: {formatTimer(elapsedSeconds)}. Case logged to CRM.
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={sessionResolved}
              placeholder={sessionResolved ? "Chat concluded. Switch scenario or reset." : "Type response to customer..."}
              className="flex-1 px-3 py-1.5 border border-neutral-300 text-xs text-black focus:outline-hidden focus:border-black disabled:bg-neutral-100"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || sessionResolved}
              className="px-4 py-1.5 bg-black hover:bg-neutral-800 disabled:bg-neutral-300 text-white text-xs font-bold transition-colors"
            >
              Send
            </button>
            <button
              type="button"
              onClick={() => setSelectedScenarioIndex(selectedScenarioIndex)}
              className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Reset Chat"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
