import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { X, Check, User, Sparkles } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, resetUserProfile, role } = useAcademy();

  const [name, setName] = useState<string>(currentUser.name);
  const [id, setId] = useState<string>(currentUser.id);
  const [title, setTitle] = useState<string>(currentUser.title);
  const [email, setEmail] = useState<string>(currentUser.email);
  const [cohort, setCohort] = useState<string>(currentUser.cohort || 'Cohort 14 (Americas Remote)');
  const [department, setDepartment] = useState<string>(currentUser.department);
  const [savedBanner, setSavedBanner] = useState<boolean>(false);

  // Sync state if currentUser changes
  React.useEffect(() => {
    setName(currentUser.name);
    setId(currentUser.id);
    setTitle(currentUser.title);
    setEmail(currentUser.email);
    setCohort(currentUser.cohort || 'Cohort 14 (Americas Remote)');
    setDepartment(currentUser.department);
  }, [currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || currentUser.name,
      id: id.trim() || currentUser.id,
      title: title.trim() || currentUser.title,
      email: email.trim() || currentUser.email,
      cohort: cohort.trim() || currentUser.cohort,
      department: department.trim() || currentUser.department
    });

    setSavedBanner(true);
    setTimeout(() => {
      setSavedBanner(false);
      onClose();
    }, 1000);
  };

  const handleApplyPreset = (presetName: string, presetEmail: string) => {
    setName(presetName);
    setEmail(presetEmail);
  };

  const handleResetDefault = () => {
    resetUserProfile(role);
    setSavedBanner(true);
    setTimeout(() => {
      setSavedBanner(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200/90 w-full max-w-lg text-neutral-900 space-y-4 p-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block">
                Konfigurasi Profil Trainee / Pengguna
              </span>
              <h3 className="text-base font-bold text-neutral-950 tracking-tight">
                Kustomisasi Identitas Kerja ({role.toUpperCase()})
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs text-neutral-700 space-y-1.5">
          <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
            Perubahan nama dan identitas akan otomatis berlaku di seluruh sistem:
          </p>
          <ul className="list-disc list-inside text-[11px] text-neutral-600 space-y-0.5 pl-1">
            <li>Header dan sapaan Dasbor Utama</li>
            <li>Nama penerima pada Dokumen Sertifikat Resmi & Kredensial Portofolio</li>
            <li>Nama penandatangan pada Memo Serah Terima Shift (Handover)</li>
            <li>Identitas agen pada sistem Helpdesk & Penugasan Manajer</li>
          </ul>
        </div>

        {/* Quick 1-Click Presets */}
        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-semibold text-neutral-800 block">
            Pilihan Cepat (1-Klik):
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleApplyPreset("Shafira Dev", "shafira.dev@nexora-ops.com")}
              className="text-xs bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200 rounded-lg px-3 py-1.5 font-medium shadow-2xs transition-all hover:border-neutral-400"
            >
              + Gunakan Nama: Shafira Dev
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("Alex Mercer", "a.mercer@nexora-ops.com")}
              className="text-xs bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-200 rounded-lg px-3 py-1.5 font-medium shadow-2xs transition-all hover:border-neutral-400"
            >
              + Kembalikan ke: Alex Mercer
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
              Nama Lengkap Trainee:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Contoh: Shafira Dev / Alex Mercer"
              className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                ID Karyawan / Trainee:
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                placeholder="NX-TR-4091"
                className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-mono text-neutral-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                Email Perusahaan:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@nexora-ops.com"
                className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs text-neutral-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                Jabatan Resmi (Title):
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Remote Customer Operations Specialist"
                className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs text-neutral-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                Divisi / Departemen:
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                placeholder="Customer Operations"
                className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs text-neutral-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
              Cohort / Angkatan Pelatihan:
            </label>
            <input
              type="text"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              placeholder="Cohort 14 (Global Remote Operations)"
              className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs text-neutral-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all shadow-2xs"
            />
          </div>

          {savedBanner && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-medium animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              Profil berhasil diperbarui dan disimpan!
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={handleResetDefault}
              className="px-3.5 py-2 text-xs rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
            >
              Reset ke Default
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-neutral-950 hover:bg-black text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all"
              >
                Simpan Profil
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
