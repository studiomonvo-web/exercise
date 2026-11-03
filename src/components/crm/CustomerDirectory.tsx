import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { CustomerRecord } from '../../types/academy';
import { 
  Users, 
  Search, 
  MapPin, 
  Plus, 
  Edit2,
  X
} from 'lucide-react';
import { IndonesianSlugHeader } from '../common/IndonesianSlugHeader';

export const CustomerDirectory: React.FC = () => {
  const { customers, updateCustomer, addCustomer } = useAcademy();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(customers[0] || null);
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [editedNotes, setEditedNotes] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Customer Form State
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newTier, setNewTier] = useState<'Standard' | 'Silver' | 'Gold VIP'>('Standard');
  const [newAddress, setNewAddress] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');

  const filteredCustomers = customers.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.tier.toLowerCase().includes(q)
    );
  });

  const handleSaveNotes = () => {
    if (!selectedCustomer) return;
    const updated = { ...selectedCustomer, notes: editedNotes };
    updateCustomer(updated);
    setSelectedCustomer(updated);
    setIsEditingNotes(false);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    addCustomer({
      name: newName,
      email: newEmail,
      phone: newPhone || '+1 (555) 000-0000',
      tier: newTier,
      lifetimeOrders: 1,
      lifetimeSpend: 99.00,
      joinDate: new Date().toISOString().split('T')[0],
      accountStatus: 'Active',
      riskScore: 'Low',
      notes: newNotes || 'Newly registered customer account.',
      address: newAddress || '100 Main St, Chicago, IL 60601'
    });

    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner with Indonesian Slug in Top Right */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h1 className="text-lg font-bold text-black uppercase tracking-tight">Nexora 360 Customer Directory & CRM</h1>
            <p className="text-xs text-neutral-600">Enterprise customer profiles, lifetime purchase histories, risk scores & account notes</p>
          </div>

          {/* Indonesian Slug in Top Right */}
          <div className="lg:w-96 shrink-0">
            <IndonesianSlugHeader moduleKey="crm" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="relative w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pelanggan (nama, email, ID)..."
              className="w-full px-2.5 py-1.5 border border-neutral-300 text-xs text-black focus:outline-hidden focus:border-black"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah Pelanggan Baru
          </button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Customer List (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 overflow-hidden">
          <div className="p-3 bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-black uppercase tracking-wide">
            Registered Customers ({filteredCustomers.length})
          </div>

          <div className="divide-y divide-neutral-200 max-h-[580px] overflow-y-auto">
            {filteredCustomers.map(c => {
              const isSelected = c.id === selectedCustomer?.id;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCustomer(c);
                    setIsEditingNotes(false);
                  }}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-neutral-100 border-l-2 border-black' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-black text-xs">{c.name}</span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {c.id}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-600 truncate mb-1.5">{c.email}</p>

                  <div className="flex items-center justify-between text-[11px] text-black">
                    <span className="font-mono text-[10px] border border-neutral-300 px-1 py-0.2 uppercase">
                      {c.tier}
                    </span>
                    <span className="font-mono font-semibold">
                      ${c.lifetimeSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 360-Profile Card (7 cols) */}
        {selectedCustomer && (
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-5 space-y-5 text-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-black">{selectedCustomer.name}</h2>
                  <span className="font-mono text-xs border border-neutral-300 px-1.5 py-0.2">
                    {selectedCustomer.tier}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-mono">
                  {selectedCustomer.id} • Joined {selectedCustomer.joinDate}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="border border-neutral-300 px-2 py-0.5">
                  Risk: {selectedCustomer.riskScore}
                </span>
                <span className="border border-neutral-300 px-2 py-0.5">
                  {selectedCustomer.accountStatus}
                </span>
              </div>
            </div>

            {/* Financial & Order Metric Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Lifetime Spend</span>
                <div className="text-base font-bold font-mono text-black">
                  ${selectedCustomer.lifetimeSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Total Orders</span>
                <div className="text-base font-bold font-mono text-black">
                  {selectedCustomer.lifetimeOrders} Orders
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Average Order</span>
                <div className="text-base font-bold font-mono text-black">
                  ${(selectedCustomer.lifetimeSpend / Math.max(1, selectedCustomer.lifetimeOrders)).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Contact & Shipping Details */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">
                Verified Contact & Shipping Details (SOP-05 Verified)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200">
                  <span className="text-neutral-500 block text-[10px]">Email</span>
                  <span className="font-semibold text-black font-mono">{selectedCustomer.email}</span>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200">
                  <span className="text-neutral-500 block text-[10px]">Phone</span>
                  <span className="font-semibold text-black font-mono">{selectedCustomer.phone}</span>
                </div>
              </div>

              <div className="p-2.5 bg-neutral-50 border border-neutral-200 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 block text-[10px]">Billing & Shipping Address:</span>
                  <span className="font-medium text-black">{selectedCustomer.address}</span>
                </div>
              </div>
            </div>

            {/* Internal CRM Notes */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-black uppercase tracking-wide text-[11px]">
                  Internal CRM Notes & Case History
                </h4>
                {!isEditingNotes && (
                  <button
                    onClick={() => {
                      setIsEditingNotes(true);
                      setEditedNotes(selectedCustomer.notes);
                    }}
                    className="inline-flex items-center gap-1 text-black font-semibold hover:underline"
                  >
                    <Edit2 className="w-3 h-3" /> Edit Notes
                  </button>
                )}
              </div>

              {isEditingNotes ? (
                <div className="space-y-2">
                  <textarea
                    rows={4}
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                    className="w-full p-2 border border-neutral-300 text-xs text-black leading-relaxed focus:outline-hidden focus:border-black"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setIsEditingNotes(false)}
                      className="px-3 py-1 border border-neutral-300 text-black text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveNotes}
                      className="px-3 py-1 bg-black text-white text-xs font-semibold"
                    >
                      Save CRM Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-black leading-relaxed font-normal">
                  {selectedCustomer.notes}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border border-neutral-300 w-full max-w-lg p-5 space-y-4 text-black">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h3 className="text-sm font-bold text-black uppercase">Add Customer Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-500 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-black mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-2.5 py-1.5 border border-neutral-300 text-black focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="m.lin@example.com"
                    className="w-full px-2.5 py-1.5 border border-neutral-300 text-black focus:outline-hidden focus:border-black"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-black mb-1">Phone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+1 (312) 555-0100"
                    className="w-full px-2.5 py-1.5 border border-neutral-300 text-black focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">Customer Tier</label>
                <select
                  value={newTier}
                  onChange={(e) => setNewTier(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 border border-neutral-300 bg-white text-black focus:outline-hidden focus:border-black"
                >
                  <option value="Standard">Standard Tier</option>
                  <option value="Silver">Silver Tier</option>
                  <option value="Gold VIP">Gold VIP Tier</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">Shipping & Billing Address</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Street, City, State, Zip"
                  className="w-full px-2.5 py-1.5 border border-neutral-300 text-black focus:outline-hidden focus:border-black"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">Operational Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Account preferences, order history..."
                  className="w-full p-2 border border-neutral-300 text-black focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-neutral-300 text-black text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold"
                >
                  Save Customer Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
