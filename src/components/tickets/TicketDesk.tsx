import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Ticket, TicketPriority, TicketStatus } from '../../types/academy';
import { COMPANY_SOPS } from '../../data/sopsData';
import { 
  Clock, 
  Send, 
  Lock, 
  User, 
  Package, 
  FileText
} from 'lucide-react';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';

const MACROS = [
  {
    title: "HEAT Apology + Priority Reshipment (SOP-04 & SOP-07)",
    content: "Dear {{customer_name}},\n\nThank you for bringing this to our attention. I completely understand your frustration with this transit delay, especially for an order of this importance. On behalf of Nexora, I sincerely apologize for the disruption.\n\nI have taken direct personal ownership of your case. I have initiated an immediate zero-dollar priority replacement order with expedited courier delivery. Your new tracking reference will update within 2 business hours.\n\nWarm regards,\n{{agent_name}}\nNexora Customer Operations"
  },
  {
    title: "Standard Return Authorization (SOP-01)",
    content: "Hello {{customer_name}},\n\nThank you for contacting Nexora Support. I have reviewed your request and confirmed your purchase is well within our 30-day return policy.\n\nI have generated a prepaid return shipping label attached below. Once our warehouse scans the parcel, your refund of ${{order_amount}} will automatically be released back to your original payment method within 3 to 5 business days.\n\nBest regards,\n{{agent_name}}\nNexora Returns Team"
  },
  {
    title: "Mandatory 3-Point PII Verification (SOP-05)",
    content: "Hello {{customer_name}},\n\nTo protect your personal data and comply with federal PCI-DSS regulations, I cannot modify shipping details or disclose account data until we verify account ownership.\n\nPlease reply directly with any two of the following:\n1. The full billing address on file\n2. The phone number associated with the order\n3. The last 4 digits of the payment card used (Please NEVER send CVV security codes)\n\nOnce confirmed, I will immediately update your order.\n\nSincerely,\n{{agent_name}}\nNexora Security & Operations"
  },
  {
    title: "Carrier Missing Package 24h Buffer (SOP-08)",
    content: "Hello {{customer_name}},\n\nThank you for reaching out. We understand how concerning it is when tracking marks a package delivered but it has not appeared. Couriers frequently scan parcels up to 24 hours in advance while completing their neighborhood route.\n\nPlease check with household members, apartment leasing lockers, or side porches. If the parcel does not arrive by 17:00 tomorrow, please reply to this message and we will immediately authorize a carrier loss claim and replacement.\n\nRespectfully,\n{{agent_name}}\nNexora Logistics"
  }
];

export const TicketDesk: React.FC = () => {
  const { tickets, replyTicket, currentUser } = useAcademy();
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [replyMode, setReplyMode] = useState<'public' | 'internal'>('public');
  const [replyText, setReplyText] = useState<string>('');
  const [resolutionNotes, setResolutionNotes] = useState<string>('');
  const [nextStatus, setNextStatus] = useState<TicketStatus>('Solved');
  const [activeSOPDrawer, setActiveSOPDrawer] = useState<boolean>(false);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const filteredTickets = tickets.filter(t => {
    if (filterPriority !== 'all' && t.priority.toLowerCase() !== filterPriority.toLowerCase()) return false;
    return true;
  });

  const handleApplyMacro = (macroText: string) => {
    if (!selectedTicket) return;
    const customized = macroText
      .replace(/{{customer_name}}/g, selectedTicket.customerName)
      .replace(/{{agent_name}}/g, currentUser.name)
      .replace(/{{order_amount}}/g, String(selectedTicket.orderAmount || 0));
    setReplyText(customized);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    replyTicket(
      selectedTicket.id,
      replyText,
      replyMode === 'internal',
      nextStatus,
      resolutionNotes
    );
    setReplyText('');
    setResolutionNotes('');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner with Indonesian Slug in Top Right */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Nexora Support Desk (Omnichannel Queue)</h1>
            <p className="text-xs text-neutral-600">Customer ticket simulation with real-time SLA deadlines and policy compliance</p>
          </div>

          {/* Indonesian Slug in Top Right */}
          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="tickets" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-600 font-medium">Tips: Gunakan Canned Macro untuk membalas tiket dalam 1 klik.</span>
          <button
            onClick={() => setActiveSOPDrawer(!activeSOPDrawer)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 hover:bg-neutral-100 text-black text-xs font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            {activeSOPDrawer ? 'Tutup Manual SOP' : 'Buka Manual SOP'}
          </button>
        </div>
      </div>

      {/* Main 2-Column Desk Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Ticket Queue List (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 overflow-hidden">
          <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
            <span className="text-xs font-bold text-black uppercase tracking-wide">
              Queue Inbox ({filteredTickets.length})
            </span>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="text-xs border border-neutral-300 px-2 py-1 bg-white text-black focus:outline-hidden"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>

          <div className="divide-y divide-neutral-200 max-h-[640px] overflow-y-auto">
            {filteredTickets.map(t => {
              const isSelected = t.id === selectedTicket?.id;
              const isBreached = t.slaRemainingMinutes <= 0;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-neutral-100 border-l-2 border-black' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-black">{t.id}</span>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-black">
                      <span className="border border-neutral-300 px-1 py-0.2 uppercase">{t.priority}</span>
                      <span className="border border-neutral-300 px-1 py-0.2 uppercase">{t.status}</span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-black truncate mb-1">
                    {t.issueCategory}
                  </h4>
                  <p className="text-[11px] text-neutral-600 line-clamp-2 mb-2">
                    {t.messages[t.messages.length - 1]?.content}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-black">
                    <span className="font-medium">{t.customerName}</span>
                    <div className="font-mono text-[11px]">
                      {isBreached ? 'SLA BREACHED' : `${t.slaRemainingMinutes}m SLA left`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Ticket Workspace (8 cols) */}
        {selectedTicket && (
          <div className="lg:col-span-8 space-y-4">
            {/* Ticket Header & Metadata Card */}
            <div className="bg-white border border-neutral-200 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-black border border-neutral-300 px-1.5 py-0.5">
                      {selectedTicket.id}
                    </span>
                    <h2 className="text-sm font-bold text-black">
                      {selectedTicket.issueCategory}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-black">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-neutral-500" />
                      {selectedTicket.customerName} ({selectedTicket.customerEmail})
                    </span>
                    <span className="text-neutral-600">[{selectedTicket.customerTier}]</span>
                    <span className="text-neutral-600">Channel: {selectedTicket.channel}</span>
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-black border border-neutral-300 px-2.5 py-1">
                  SLA: {selectedTicket.slaRemainingMinutes > 0 ? `${selectedTicket.slaRemainingMinutes} min buffer` : 'BREACHED'}
                </div>
              </div>

              {/* Order Context Strip */}
              {selectedTicket.orderReference && (
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 text-xs flex flex-wrap items-center justify-between gap-2 text-black">
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="font-semibold">Order Ref: {selectedTicket.orderReference}</span>
                    <span>Amount: ${selectedTicket.orderAmount?.toFixed(2)}</span>
                    <span className="text-neutral-600">Date: {selectedTicket.orderDate}</span>
                  </div>
                  {selectedTicket.trackingNumber && (
                    <div className="font-mono text-neutral-700">
                      {selectedTicket.courier}: {selectedTicket.trackingNumber}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Conversation Stream */}
            <div className="bg-white border border-neutral-200 overflow-hidden">
              <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between text-xs">
                <span className="font-bold text-black uppercase tracking-wide">
                  Case Activity Timeline
                </span>
                <span className="text-neutral-500">Assigned: {selectedTicket.assignedAgent || 'Alex Mercer'}</span>
              </div>

              <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
                {selectedTicket.messages.map((m, idx) => {
                  const isCust = m.sender === 'customer';
                  const isInternal = m.isInternal;

                  return (
                    <div
                      key={m.id || idx}
                      className={`p-3.5 border text-xs space-y-1 ${
                        isInternal 
                          ? 'bg-neutral-100 border-neutral-300 text-black ml-4'
                          : isCust 
                            ? 'bg-white border-neutral-200 text-black mr-4'
                            : 'bg-neutral-50 border-neutral-300 text-black ml-4'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] pb-1 border-b border-neutral-200">
                        <div className="flex items-center gap-1.5 font-bold text-black">
                          {isInternal && <Lock className="w-3 h-3 text-black" />}
                          <span>{m.senderName}</span>
                          <span className="text-[10px] font-normal text-neutral-500">
                            ({isInternal ? 'Internal Note' : isCust ? 'Customer' : 'Specialist Agent'})
                          </span>
                        </div>
                        <span className="text-neutral-500 font-mono text-[10px]">{m.timestamp}</span>
                      </div>
                      <p className="whitespace-pre-line leading-relaxed font-normal text-black">
                        {m.content}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box & Composer */}
              <div className="p-4 border-t border-neutral-200 bg-neutral-50 space-y-3">
                {/* Mode Tabs */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReplyMode('public')}
                      className={`px-3 py-1 text-xs font-semibold transition-colors ${
                        replyMode === 'public'
                          ? 'bg-black text-white'
                          : 'bg-white text-black border border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      Public Reply
                    </button>
                    <button
                      onClick={() => setReplyMode('internal')}
                      className={`px-3 py-1 text-xs font-semibold transition-colors flex items-center gap-1 ${
                        replyMode === 'internal'
                          ? 'bg-black text-white'
                          : 'bg-white text-black border border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      Internal Note
                    </button>
                  </div>

                  {/* Macro Selector */}
                  <select
                    onChange={(e) => {
                      const idx = parseInt(e.target.value, 10);
                      if (!isNaN(idx)) handleApplyMacro(MACROS[idx].content);
                    }}
                    defaultValue=""
                    className="text-xs border border-neutral-300 px-2.5 py-1 bg-white text-black font-medium focus:outline-hidden"
                  >
                    <option value="" disabled>Insert Canned Macro...</option>
                    {MACROS.map((m, i) => (
                      <option key={i} value={i}>{m.title}</option>
                    ))}
                  </select>
                </div>

                {/* Textarea */}
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={
                    replyMode === 'public'
                      ? "Write response to customer (follow HEAT model and relevant SOP)..."
                      : "Add internal investigation note..."
                  }
                  className="w-full p-2.5 border border-neutral-300 text-xs text-black leading-relaxed focus:outline-hidden focus:border-black bg-white"
                />

                {/* Bottom Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-black">Set Ticket Status:</span>
                    <select
                      value={nextStatus}
                      onChange={(e) => setNextStatus(e.target.value as TicketStatus)}
                      className="text-xs border border-neutral-300 px-2 py-1 bg-white text-black font-medium focus:outline-hidden"
                    >
                      <option value="Solved">Solved</option>
                      <option value="Pending">Pending Customer</option>
                      <option value="Escalated">Escalated to Tier-2</option>
                      <option value="Open">Keep Open</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="inline-flex items-center gap-1 px-4 py-1.5 bg-black hover:bg-neutral-800 disabled:bg-neutral-300 text-white text-xs font-bold transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    Submit {replyMode === 'internal' ? 'Note' : 'Response'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SOP Reference Drawer */}
      {activeSOPDrawer && (
        <div className="bg-white border border-neutral-200 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <h3 className="text-xs font-bold text-black uppercase tracking-wide">
              Nexora Standard Operating Procedures (Quick Reference)
            </h3>
            <span className="text-[11px] text-neutral-500">Corporate Compliance V3.4</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {COMPANY_SOPS.slice(0, 4).map(sop => (
              <div key={sop.id} className="p-3 bg-neutral-50 border border-neutral-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black font-mono text-[11px]">{sop.id}</span>
                  <span className="text-[10px] text-neutral-500">Ver. {sop.version}</span>
                </div>
                <h5 className="font-bold text-black line-clamp-1">{sop.title}</h5>
                <p className="text-neutral-700 line-clamp-3 text-[11px] font-normal">{sop.summary}</p>
                <div className="pt-1 text-[10px] text-neutral-600">
                  Escalation: {sop.escalationRules[0] || 'Standard supervisor notification'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
