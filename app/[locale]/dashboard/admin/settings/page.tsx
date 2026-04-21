'use client';

import { useState } from 'react';
import {
  School, Bell, Shield, Globe, Palette, ChevronRight,
  Save, Eye, EyeOff, Check,
} from 'lucide-react';

type SettingsTab = 'school' | 'notifications' | 'security' | 'appearance';

const TABS: { key: SettingsTab; icon: typeof School; label: string }[] = [
  { key: 'school',        icon: School,  label: 'Établissement' },
  { key: 'notifications', icon: Bell,    label: 'Notifications' },
  { key: 'security',      icon: Shield,  label: 'Sécurité' },
  { key: 'appearance',    icon: Palette, label: 'Apparence' },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative inline-flex w-11 h-6 rounded-full transition-colors flex-shrink-0"
      style={{ backgroundColor: checked ? 'var(--accent-primary)' : 'var(--background-muted)' }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  );
}

function Field({
  label, sublabel, children,
}: {
  label: string; sublabel?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[var(--border-color)] last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
        {sublabel && <p className="text-xs text-[var(--text-muted)] mt-0.5">{sublabel}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<SettingsTab>('school');
  const [saved, setSaved] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // School state
  const [schoolName, setSchoolName] = useState("Pôle d'Excellence Scolaire");
  const [schoolCity, setSchoolCity] = useState('Douala');
  const [schoolYear, setSchoolYear] = useState('2025–2026');
  const [schoolPhone, setSchoolPhone] = useState('+237 600 000 000');
  const [schoolEmail, setSchoolEmail] = useState('contact@pes-douala.cm');

  // Notification toggles
  const [notifs, setNotifs] = useState({
    newInscription: true,
    pendingApproval: true,
    newQuestion: false,
    newCareerApp: true,
    weeklyReport: true,
    maintenanceAlert: false,
  });

  // Security state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('8h');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-5">

      <div>
        <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Paramètres</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Configuration de l&apos;administration PES</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">

        {/* Sidebar tabs */}
        <div className="md:w-52 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
          {TABS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex-shrink-0 md:w-full"
              style={tab === key
                ? { backgroundColor: 'var(--accent-primary)', color: '#fff' }
                : { color: 'var(--text-secondary)', backgroundColor: 'var(--background)' }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="flex-1 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">

          {/* ── SCHOOL ── */}
          {tab === 'school' && (
            <div>
              <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center gap-2">
                <School size={16} className="text-[var(--accent-primary)]" />
                <h2 className="font-semibold text-[var(--text-primary)]">Informations de l&apos;établissement</h2>
              </div>
              <div className="px-5 py-2">
                {[
                  { label: 'Nom de l\'établissement', value: schoolName, setter: setSchoolName },
                  { label: 'Ville',                   value: schoolCity,   setter: setSchoolCity },
                  { label: 'Année scolaire',           value: schoolYear,   setter: setSchoolYear },
                  { label: 'Téléphone',                value: schoolPhone,  setter: setSchoolPhone },
                  { label: 'Email de contact',         value: schoolEmail,  setter: setSchoolEmail },
                ].map(({ label, value, setter }) => (
                  <div key={label} className="py-4 border-b border-[var(--border-color)] last:border-0">
                    <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary)] transition-colors"
                    />
                  </div>
                ))}

                {/* Academic trimester */}
                <div className="py-4">
                  <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">
                    Trimestre en cours
                  </label>
                  <div className="flex gap-2">
                    {['Trimestre 1', 'Trimestre 2', 'Trimestre 3'].map((t, i) => (
                      <button
                        key={t}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
                        style={i === 1
                          ? { backgroundColor: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }
                          : { backgroundColor: 'var(--background-soft)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                      >
                        T{i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {tab === 'notifications' && (
            <div>
              <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center gap-2">
                <Bell size={16} className="text-[var(--accent-primary)]" />
                <h2 className="font-semibold text-[var(--text-primary)]">Préférences de notifications</h2>
              </div>
              <div className="px-5 py-2">
                <Field label="Nouvelle inscription" sublabel="Alerter dès qu'un utilisateur s'inscrit">
                  <Toggle checked={notifs.newInscription} onChange={(v) => setNotifs((n) => ({ ...n, newInscription: v }))} />
                </Field>
                <Field label="Approbation en attente" sublabel="Rappel quotidien si des inscriptions sont en attente">
                  <Toggle checked={notifs.pendingApproval} onChange={(v) => setNotifs((n) => ({ ...n, pendingApproval: v }))} />
                </Field>
                <Field label="Nouvelle question élève" sublabel="Notification à chaque question posée">
                  <Toggle checked={notifs.newQuestion} onChange={(v) => setNotifs((n) => ({ ...n, newQuestion: v }))} />
                </Field>
                <Field label="Candidature enseignant" sublabel="Alerter lors d'une nouvelle candidature">
                  <Toggle checked={notifs.newCareerApp} onChange={(v) => setNotifs((n) => ({ ...n, newCareerApp: v }))} />
                </Field>
                <Field label="Rapport hebdomadaire" sublabel="Résumé envoyé chaque lundi matin">
                  <Toggle checked={notifs.weeklyReport} onChange={(v) => setNotifs((n) => ({ ...n, weeklyReport: v }))} />
                </Field>
                <Field label="Alertes de maintenance" sublabel="Notifications système et mises à jour">
                  <Toggle checked={notifs.maintenanceAlert} onChange={(v) => setNotifs((n) => ({ ...n, maintenanceAlert: v }))} />
                </Field>
              </div>
            </div>
          )}

          {/* ── SECURITY ── */}
          {tab === 'security' && (
            <div>
              <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center gap-2">
                <Shield size={16} className="text-[var(--accent-primary)]" />
                <h2 className="font-semibold text-[var(--text-primary)]">Sécurité du compte</h2>
              </div>
              <div className="px-5 py-2">
                {/* Change password */}
                <div className="py-4 border-b border-[var(--border-color)]">
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-4">Changer le mot de passe</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Mot de passe actuel', value: currentPwd, setter: setCurrentPwd },
                      { label: 'Nouveau mot de passe', value: newPwd, setter: setNewPwd },
                      { label: 'Confirmer le nouveau mot de passe', value: confirmPwd, setter: setConfirmPwd },
                    ].map(({ label, value, setter }) => (
                      <div key={label}>
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">
                          {label}
                        </label>
                        <div className="relative">
                          <input
                            type={showPwd ? 'text' : 'password'}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary)] transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPwd((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                          >
                            {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2FA */}
                <Field
                  label="Double authentification (2FA)"
                  sublabel="Sécurisez votre compte avec un code temporaire"
                >
                  <Toggle checked={twoFactor} onChange={setTwoFactor} />
                </Field>

                {/* Session timeout */}
                <div className="py-4">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Délai d&apos;expiration de session</p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">Déconnexion automatique après inactivité</p>
                  <div className="flex gap-2">
                    {['1h', '4h', '8h', '24h'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSessionTimeout(t)}
                        className="flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors"
                        style={sessionTimeout === t
                          ? { backgroundColor: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }
                          : { backgroundColor: 'var(--background-soft)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active sessions */}
                <div className="py-4">
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">Sessions actives</p>
                  <div className="space-y-2">
                    {[
                      { device: 'Chrome — Windows 11', location: 'Douala, CM', current: true },
                      { device: 'Safari — iPhone 15', location: 'Douala, CM', current: false },
                    ].map(({ device, location, current }) => (
                      <div key={device} className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)]">
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-primary)]">{device}</p>
                          <p className="text-[11px] text-[var(--text-muted)]">{location}</p>
                        </div>
                        {current
                          ? <span className="text-[10px] font-bold text-[#16A34A] bg-[#D1FAE5] px-2 py-0.5 rounded-full">Actuel</span>
                          : <button className="text-[11px] font-medium text-[#EF4444] hover:underline">Révoquer</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── APPEARANCE ── */}
          {tab === 'appearance' && (
            <div>
              <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center gap-2">
                <Palette size={16} className="text-[var(--accent-primary)]" />
                <h2 className="font-semibold text-[var(--text-primary)]">Apparence</h2>
              </div>
              <div className="px-5 py-2">

                {/* Language */}
                <div className="py-4 border-b border-[var(--border-color)]">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <Globe size={12} /> Langue de l&apos;interface
                  </p>
                  <div className="flex gap-2">
                    {[{ code: 'fr', label: 'Français' }, { code: 'en', label: 'English' }].map(({ code, label }) => (
                      <button
                        key={code}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
                        style={code === 'fr'
                          ? { backgroundColor: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }
                          : { backgroundColor: 'var(--background-soft)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div className="py-4 border-b border-[var(--border-color)]">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">Thème</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'light', label: 'Clair', preview: ['#FFFFFF', '#F8FAFC', '#E2E8F0'] },
                      { key: 'dark',  label: 'Sombre', preview: ['#0F172A', '#1E293B', '#334155'] },
                      { key: 'auto',  label: 'Auto',   preview: ['#FFFFFF', '#0F172A', '#2563EB'] },
                    ].map(({ key, label, preview }) => (
                      <button
                        key={key}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors"
                        style={key === 'auto'
                          ? { borderColor: 'var(--accent-primary)', backgroundColor: 'var(--accent-soft)' }
                          : { borderColor: 'var(--border-color)', backgroundColor: 'var(--background-soft)' }}
                      >
                        <div className="flex gap-0.5">
                          {preview.map((c) => (
                            <div key={c} className="w-5 h-5 rounded" style={{ backgroundColor: c, border: '1px solid rgba(0,0,0,0.08)' }} />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-[var(--text-secondary)]">{label}</span>
                        {key === 'auto' && <span className="w-4 h-4 rounded-full bg-[var(--accent-primary)] flex items-center justify-center"><Check size={9} color="#fff" /></span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent color */}
                <div className="py-4">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">Couleur d&apos;accentuation</p>
                  <div className="flex gap-3">
                    {['#2563EB', '#7C3AED', '#16A34A', '#D97706', '#DB2777', '#0891B2'].map((c) => (
                      <button
                        key={c}
                        className="w-9 h-9 rounded-xl transition-transform hover:scale-110 border-2"
                        style={{
                          backgroundColor: c,
                          borderColor: c === '#2563EB' ? '#fff' : 'transparent',
                          boxShadow: c === '#2563EB' ? `0 0 0 2px ${c}` : undefined,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="px-5 py-4 border-t border-[var(--border-color)] flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                backgroundColor: saved ? '#16A34A' : 'var(--accent-primary)',
                boxShadow: saved ? '0 2px 8px rgb(22 163 74 / 0.35)' : '0 2px 8px rgb(37 99 235 / 0.35)',
              }}
            >
              {saved ? <Check size={15} /> : <Save size={15} />}
              {saved ? 'Enregistré !' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-[#FEE2E2] bg-[var(--background)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#FEE2E2]">
          <h2 className="font-semibold text-[#EF4444] text-sm">Zone dangereuse</h2>
        </div>
        <div className="px-5 py-4 space-y-3">
          {[
            { label: 'Exporter toutes les données', desc: 'Télécharger une archive complète de toutes les données', action: 'Exporter', safe: true },
            { label: 'Réinitialiser les statistiques', desc: 'Effacer toutes les statistiques et repartir de zéro', action: 'Réinitialiser', safe: false },
            { label: 'Vider la base de données', desc: 'Action irréversible — supprime tous les utilisateurs et données', action: 'Vider', safe: false },
          ].map(({ label, desc, action, safe }) => (
            <div key={label} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{desc}</p>
              </div>
              <button
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors"
                style={safe
                  ? { borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'var(--background-soft)' }
                  : { borderColor: '#FCA5A5', color: '#EF4444', backgroundColor: '#FEF2F2' }}
              >
                {action}
                <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
