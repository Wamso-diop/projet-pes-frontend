'use client';
import { useState } from 'react';
import { User, Mail, Phone, Save, Bell, Shield } from 'lucide-react';

export default function ParentProfile() {
  const [form, setForm] = useState({
    name: 'Marie Nkomo', email: 'marie.n@gmail.com', phone: '+237 6 55 44 33 22',
  });
  const [notifs, setNotifs] = useState({ grades: true, absences: true, messages: true, calendar: false });
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-4 md:p-6 max-w-2xl space-y-5">
      <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Mon profil</h1>

      {/* Banner */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #16A34A 0%, #0891B2 100%)' }}
      >
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-black text-white">MN</div>
          <div>
            <p className="font-bold text-xl text-white">{form.name}</p>
            <p className="text-white/65 text-sm">Parent de Lucas Tchinda · 3e</p>
            <button className="text-white/80 hover:text-white text-xs underline mt-1">Changer la photo</button>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-6 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* Personal info */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <User size={16} className="text-[var(--accent-primary)]" />
          <h2 className="font-semibold text-[var(--text-primary)]">Informations personnelles</h2>
        </div>
        {[
          { key: 'name',  label: 'Nom complet', icon: User,  type: 'text'  },
          { key: 'email', label: 'Email',        icon: Mail,  type: 'email' },
          { key: 'phone', label: 'Téléphone',    icon: Phone, type: 'tel'   },
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
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-[var(--accent-primary)]" />
          <h2 className="font-semibold text-[var(--text-primary)]">Notifications</h2>
        </div>
        {[
          { key: 'grades',   label: 'Nouvelles notes de Lucas'       },
          { key: 'absences', label: 'Absences et retards'            },
          { key: 'messages', label: 'Messages des enseignants'       },
          { key: 'calendar', label: 'Rappels du calendrier scolaire' },
        ].map(({ key, label }) => {
          const on = notifs[key as keyof typeof notifs];
          return (
            <div key={key} className="flex items-center justify-between gap-3">
              <p className="text-sm text-[var(--text-primary)]">{label}</p>
              <button
                onClick={() => setNotifs(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                className="w-12 h-6 rounded-full transition-colors relative flex-shrink-0"
                style={{ backgroundColor: on ? 'var(--accent-primary)' : 'var(--background-muted)' }}
              >
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: on ? '26px' : '2px' }} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Password */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-[var(--accent-primary)]" />
          <h2 className="font-semibold text-[var(--text-primary)]">Sécurité</h2>
        </div>
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
