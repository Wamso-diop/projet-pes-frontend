'use client';

import { useState } from 'react';
import {
  Bell, Shield, Palette, BookOpen,
  Save, Eye, EyeOff, Check, Globe, Clock, Users,
} from 'lucide-react';

type Tab = 'teaching' | 'notifications' | 'security' | 'appearance';

const TABS: { key: Tab; icon: typeof Bell; label: string }[] = [
  { key: 'teaching',      icon: BookOpen, label: 'Enseignement' },
  { key: 'notifications', icon: Bell,     label: 'Notifications' },
  { key: 'security',      icon: Shield,   label: 'Sécurité' },
  { key: 'appearance',    icon: Palette,  label: 'Apparence' },
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

function Field({ label, sublabel, children }: { label: string; sublabel?: string; children: React.ReactNode }) {
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

export default function TeacherSettingsPage() {
  const [tab, setTab]   = useState<Tab>('teaching');
  const [saved, setSaved] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // Teaching preferences
  const [defaultClass, setDefaultClass] = useState('3e A');
  const [correctionMode, setCorrectionMode] = useState<'immediate' | 'deferred'>('immediate');
  const [questionVisibility, setQuestionVisibility] = useState<'class' | 'all'>('class');

  // Notification toggles
  const [notifs, setNotifs] = useState({
    newQuestion:  true,
    questionReminder: true,
    gradeDeadline: true,
    resourceDownload: false,
    weeklyReport: true,
    adminMessage: true,
  });

  // Security
  const [sessionTimeout, setSessionTimeout] = useState('8h');
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-5">

      <div>
        <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Paramètres</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Personnalisez votre espace enseignant</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">

        {/* Sidebar tabs */}
        <div className="md:w-52 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0 flex-shrink-0">
          {TABS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex-shrink-0 md:w-full"
              style={tab === key
                ? { backgroundColor: 'var(--accent-primary)', color: '#fff' }
                : { color: 'var(--text-secondary)', backgroundColor: 'var(--background)', border: '1px solid var(--border-color)' }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">

          {/* ── TEACHING ── */}
          {tab === 'teaching' && (
            <div>
              <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center gap-2">
                <BookOpen size={16} className="text-[var(--accent-primary)]" />
                <h2 className="font-semibold text-[var(--text-primary)]">Préférences d&apos;enseignement</h2>
              </div>
              <div className="px-5 py-2">

                {/* Default class */}
                <div className="py-4 border-b border-[var(--border-color)]">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Classe par défaut</p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">Classe affichée en premier à l&apos;ouverture des notes</p>
                  <div className="flex gap-2">
                    {['3e A', '3e B', '2nde C'].map(c => (
                      <button
                        key={c}
                        onClick={() => setDefaultClass(c)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
                        style={defaultClass === c
                          ? { backgroundColor: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }
                          : { backgroundColor: 'var(--background-soft)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Correction mode */}
                <div className="py-4 border-b border-[var(--border-color)]">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Mode de correction des questions</p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">Quand les réponses sont visibles pour les élèves</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'immediate', label: 'Immédiat', sub: 'Dès que vous répondez' },
                      { key: 'deferred',  label: 'Différé',  sub: 'Après validation manuelle' },
                    ].map(({ key, label, sub }) => (
                      <button
                        key={key}
                        onClick={() => setCorrectionMode(key as typeof correctionMode)}
                        className="p-3.5 rounded-xl border text-left transition-colors"
                        style={correctionMode === key
                          ? { borderColor: 'var(--accent-primary)', backgroundColor: 'var(--accent-soft)' }
                          : { borderColor: 'var(--border-color)', backgroundColor: 'var(--background-soft)' }}
                      >
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question visibility */}
                <div className="py-4 border-b border-[var(--border-color)]">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Visibilité des questions</p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">Qui peut voir les questions posées</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'class', label: 'Classe uniquement', sub: 'Seuls les élèves de la même classe' },
                      { key: 'all',   label: 'Toutes les classes', sub: 'Tous les élèves peuvent voir' },
                    ].map(({ key, label, sub }) => (
                      <button
                        key={key}
                        onClick={() => setQuestionVisibility(key as typeof questionVisibility)}
                        className="p-3.5 rounded-xl border text-left transition-colors"
                        style={questionVisibility === key
                          ? { borderColor: 'var(--accent-primary)', backgroundColor: 'var(--accent-soft)' }
                          : { borderColor: 'var(--border-color)', backgroundColor: 'var(--background-soft)' }}
                      >
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="py-4">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1 flex items-center gap-2">
                    <Clock size={14} /> Disponibilités
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">Jours où vous êtes disponible pour répondre aux questions</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => {
                      const active = i < 5;
                      return (
                        <button
                          key={day}
                          className="w-12 h-12 rounded-xl text-sm font-semibold border transition-colors"
                          style={active
                            ? { backgroundColor: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }
                            : { backgroundColor: 'var(--background-soft)', color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}
                        >
                          {day}
                        </button>
                      );
                    })}
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
                <Field label="Nouvelle question" sublabel="Alerter dès qu'un élève pose une question">
                  <Toggle checked={notifs.newQuestion} onChange={v => setNotifs(n => ({ ...n, newQuestion: v }))} />
                </Field>
                <Field label="Rappel — questions sans réponse" sublabel="Rappel si une question reste sans réponse après 24h">
                  <Toggle checked={notifs.questionReminder} onChange={v => setNotifs(n => ({ ...n, questionReminder: v }))} />
                </Field>
                <Field label="Échéance de saisie des notes" sublabel="Rappel avant la date limite de saisie des résultats">
                  <Toggle checked={notifs.gradeDeadline} onChange={v => setNotifs(n => ({ ...n, gradeDeadline: v }))} />
                </Field>
                <Field label="Téléchargement de ressource" sublabel="Notifier à chaque téléchargement d'une de vos ressources">
                  <Toggle checked={notifs.resourceDownload} onChange={v => setNotifs(n => ({ ...n, resourceDownload: v }))} />
                </Field>
                <Field label="Rapport hebdomadaire" sublabel="Résumé d'activité chaque lundi matin">
                  <Toggle checked={notifs.weeklyReport} onChange={v => setNotifs(n => ({ ...n, weeklyReport: v }))} />
                </Field>
                <Field label="Messages de l'administration" sublabel="Notifications importantes envoyées par l'admin">
                  <Toggle checked={notifs.adminMessage} onChange={v => setNotifs(n => ({ ...n, adminMessage: v }))} />
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
                {/* Password */}
                <div className="py-4 border-b border-[var(--border-color)]">
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-4">Changer le mot de passe</p>
                  <div className="space-y-3">
                    {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le nouveau'].map(label => (
                      <div key={label}>
                        <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">
                          {label}
                        </label>
                        <div className="relative">
                          <input
                            type={showPwd ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 pr-10 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] transition-colors"
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

                <Field label="Double authentification (2FA)" sublabel="Code temporaire requis à chaque connexion">
                  <Toggle checked={twoFactor} onChange={setTwoFactor} />
                </Field>

                {/* Session timeout */}
                <div className="py-4">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Expiration de session</p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">Déconnexion automatique après inactivité</p>
                  <div className="flex gap-2">
                    {['1h', '4h', '8h', '24h'].map(t => (
                      <button
                        key={t}
                        onClick={() => setSessionTimeout(t)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
                        style={sessionTimeout === t
                          ? { backgroundColor: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }
                          : { backgroundColor: 'var(--background-soft)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                      >
                        {t}
                      </button>
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
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1 flex items-center gap-2">
                    <Globe size={14} /> Langue de l&apos;interface
                  </p>
                  <div className="flex gap-2 mt-3">
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
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Thème</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'light', label: 'Clair',  preview: ['#FFFFFF', '#F8FAFC', '#E2E8F0'] },
                      { key: 'dark',  label: 'Sombre', preview: ['#0F172A', '#1E293B', '#334155'] },
                      { key: 'auto',  label: 'Auto',   preview: ['#FFFFFF', '#0F172A', '#D97706'] },
                    ].map(({ key, label, preview }) => (
                      <button
                        key={key}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors"
                        style={key === 'auto'
                          ? { borderColor: 'var(--accent-primary)', backgroundColor: 'var(--accent-soft)' }
                          : { borderColor: 'var(--border-color)', backgroundColor: 'var(--background-soft)' }}
                      >
                        <div className="flex gap-0.5">
                          {preview.map(c => (
                            <div key={c} className="w-5 h-5 rounded" style={{ backgroundColor: c, border: '1px solid rgba(0,0,0,0.08)' }} />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-[var(--text-secondary)]">{label}</span>
                        {key === 'auto' && (
                          <span className="w-4 h-4 rounded-full bg-[var(--accent-primary)] flex items-center justify-center">
                            <Check size={9} color="#fff" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent color */}
                <div className="py-4">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Couleur d&apos;accentuation</p>
                  <div className="flex gap-3">
                    {['#D97706', '#2563EB', '#7C3AED', '#16A34A', '#DB2777', '#0891B2'].map((c) => (
                      <button
                        key={c}
                        className="w-9 h-9 rounded-xl transition-transform hover:scale-110 border-2"
                        style={{
                          backgroundColor: c,
                          borderColor: c === '#D97706' ? '#fff' : 'transparent',
                          boxShadow: c === '#D97706' ? `0 0 0 2px ${c}` : undefined,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save */}
          <div className="px-5 py-4 border-t border-[var(--border-color)] flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                backgroundColor: saved ? '#16A34A' : 'var(--accent-primary)',
                boxShadow: saved ? '0 2px 8px rgb(22 163 74 / 0.35)' : '0 2px 8px rgb(217 119 6 / 0.35)',
              }}
            >
              {saved ? <Check size={15} /> : <Save size={15} />}
              {saved ? 'Enregistré !' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
