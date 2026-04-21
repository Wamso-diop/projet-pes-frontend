'use client';
import { useState } from 'react';
import { User, Mail, Phone, BookOpen, Save, Check, Eye, EyeOff, Camera } from 'lucide-react';

export default function TeacherProfile() {
  const [form, setForm] = useState({
    firstName: 'Alain',
    lastName:  'Mbida',
    email:     'a.mbida@pes.cm',
    phone:     '+237 6 99 00 11 22',
    subject:   'Mathématiques',
    level:     'Collège / Lycée',
    bio:       'Enseignant de mathématiques depuis 12 ans. Spécialisé en algèbre, géométrie analytique et préparation aux examens nationaux (BEPC, Bac).',
  });
  const [saved, setSaved]   = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const stats = [
    { label: 'Classes',   value: '3'   },
    { label: 'Élèves',    value: '54'  },
    { label: 'Ressources',value: '12'  },
    { label: 'Années exp.',value: '12' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-3xl">

      {/* Profile banner */}
      <div
        className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-2xl font-black text-white">
              AM
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Camera size={13} className="text-[#D97706]" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="text-white/65 text-sm mb-1">Enseignant</p>
            <h1 className="font-display font-black text-2xl md:text-3xl text-white leading-tight">
              {form.firstName} {form.lastName}
            </h1>
            <p className="text-white/65 text-sm mt-1">{form.subject} · PES Douala</p>
          </div>

          {/* Stats */}
          <div className="flex gap-5 sm:gap-6">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-display font-black text-2xl text-white leading-none">{value}</p>
                <p className="text-white/55 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -right-4 -bottom-12 w-64 h-64 rounded-full bg-white/5" />
      </div>

      {/* Personal info */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--text-primary)]">Informations personnelles</h2>
        </div>
        <div className="p-5 space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'firstName', label: 'Prénom',  icon: User },
              { key: 'lastName',  label: 'Nom',     icon: User },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Contact row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'email', label: 'Email',      icon: Mail,  type: 'email' },
              { key: 'phone', label: 'Téléphone',  icon: Phone, type: 'tel'   },
            ].map(({ key, label, icon: Icon, type }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Subject + level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'subject', label: 'Matière enseignée', icon: BookOpen },
              { key: 'level',   label: 'Niveaux',           icon: BookOpen },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">
              Biographie / Présentation
            </label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] resize-none leading-relaxed transition-colors"
            />
            <p className="text-xs text-[var(--text-muted)] mt-1">{form.bio.length} / 300 caractères</p>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--text-primary)]">Changer le mot de passe</h2>
        </div>
        <div className="p-5 space-y-4">
          {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le nouveau mot de passe'].map(label => (
            <div key={label}>
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">
                {label}
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 pr-10 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all shadow-[0_4px_16px_rgb(0_0_0/0.15)]"
        style={{ backgroundColor: saved ? '#16A34A' : 'var(--accent-primary)' }}
      >
        {saved ? <Check size={16} /> : <Save size={16} />}
        {saved ? 'Modifications enregistrées !' : 'Enregistrer les modifications'}
      </button>

    </div>
  );
}
