'use client';
import { useState } from 'react';
import { User, Mail, Phone, BookOpen, Save } from 'lucide-react';

export default function TeacherProfile() {
  const [form, setForm] = useState({
    name: 'Alain Mbida', email: 'a.mbida@pes.cm',
    phone: '+237 6 99 00 11 22', subject: 'Mathématiques',
    bio: 'Enseignant de mathématiques depuis 12 ans. Spécialisé en algèbre et géométrie analytique.',
  });
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-4 md:p-6 max-w-2xl space-y-5">
      <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Mon profil</h1>

      {/* Avatar card */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
      >
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-black text-white">AM</div>
          <div>
            <p className="font-bold text-xl text-white">{form.name}</p>
            <p className="text-white/65 text-sm">{form.subject} · PES Douala</p>
            <button className="text-white/80 hover:text-white text-xs underline mt-1">Changer la photo</button>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-6 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* Personal info */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 space-y-4">
        <h2 className="font-semibold text-[var(--text-primary)]">Informations personnelles</h2>
        {[
          { key: 'name',    label: 'Nom complet', icon: User,     type: 'text'  },
          { key: 'email',   label: 'Email',        icon: Mail,     type: 'email' },
          { key: 'phone',   label: 'Téléphone',    icon: Phone,    type: 'tel'   },
          { key: 'subject', label: 'Matière',      icon: BookOpen, type: 'text'  },
        ].map(({ key, label, icon: Icon, type }) => (
          <div key={key}>
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2 block">{label}</label>
            <div className="relative">
              <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input type={type} value={form[key as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
              />
            </div>
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2 block">Biographie</label>
          <textarea rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] resize-none"
          />
        </div>
      </div>

      {/* Password */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 space-y-4">
        <h2 className="font-semibold text-[var(--text-primary)]">Changer le mot de passe</h2>
        {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le nouveau'].map(label => (
          <div key={label}>
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2 block">{label}</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]" />
          </div>
        ))}
      </div>

      <button onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all"
        style={{ backgroundColor: saved ? '#16A34A' : 'var(--accent-primary)' }}
      >
        <Save size={16} /> {saved ? 'Modifications enregistrées !' : 'Enregistrer les modifications'}
      </button>
    </div>
  );
}
