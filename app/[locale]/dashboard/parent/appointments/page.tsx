'use client';
import { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle2, XCircle, X } from 'lucide-react';

const UPCOMING = [
  { id: 3, teacher: 'M. Mbida',  subject: 'Mathématiques', date: 'Mer 23 avr.', time: '17h', status: 'confirmed' },
  { id: 4, teacher: 'Mme Ateba', subject: 'Français',       date: 'Jeu 1 mai',  time: '15h', status: 'pending'   },
];

const PAST = [
  { id: 1, teacher: 'M. Mbida', subject: 'Mathématiques', date: 'Mer 9 avr.',  time: '17h', status: 'done',
    notes: "Bons progrès en algèbre. Travailler les exercices de trigonométrie pour le prochain DS." },
  { id: 2, teacher: 'Dr Eto',   subject: 'Physique',       date: 'Ven 28 mar.', time: '16h', status: 'cancelled', notes: null },
];

const TEACHERS = ['M. Mbida — Mathématiques', 'Dr Eto — Physique', 'Mme Ateba — Français', 'Mme Zang — Histoire'];
const SLOTS    = ['14h00', '15h00', '16h00', '17h00', '18h00'];

const STATUS: Record<string, { bg: string; color: string; label: string; icon?: React.ReactNode }> = {
  confirmed: { bg: '#D1FAE5', color: '#16A34A', label: 'Confirmé'   },
  pending:   { bg: '#FEF3C7', color: '#D97706', label: 'En attente' },
  done:      { bg: '#EFF6FF', color: '#2563EB', label: 'Terminé'    },
  cancelled: { bg: '#FEE2E2', color: '#EF4444', label: 'Annulé'     },
};

export default function ParentAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ teacher: '', date: '', slot: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (form.teacher && form.date && form.slot) {
      setSent(true);
      setTimeout(() => { setSent(false); setShowModal(false); setForm({ teacher: '', date: '', slot: '', message: '' }); }, 2000);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Rendez-vous</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Rencontres avec les enseignants</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Demander
        </button>
      </div>

      {/* Upcoming */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--text-primary)]">À venir</h2>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {UPCOMING.map(({ id, teacher, subject, date, time, status }) => {
            const st = STATUS[status];
            return (
              <div key={id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{teacher}</p>
                  <p className="text-xs text-[var(--text-muted)]">{subject}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-0.5">
                    <Clock size={11} /> {date} · {time}
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* History */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--text-primary)]">Historique</h2>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {PAST.map(({ id, teacher, subject, date, time, status, notes }) => {
            const st = STATUS[status];
            return (
              <div key={id} className="px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: st.bg }}>
                    {status === 'done'
                      ? <CheckCircle2 size={18} style={{ color: st.color }} />
                      : <XCircle size={18} style={{ color: st.color }} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{teacher} · {subject}</p>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-0.5">
                      <Clock size={11} /> {date} · {time}
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                </div>
                {notes && (
                  <div className="mt-3 ml-15 rounded-xl bg-[var(--background-soft)] p-4">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{notes}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-[var(--background)] border border-[var(--border-color)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">Demander un rendez-vous</h2>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--background-muted)] text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2 block">Enseignant</label>
                <select value={form.teacher} onChange={e => setForm(f => ({ ...f, teacher: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]">
                  <option value="">Sélectionner…</option>
                  {TEACHERS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2 block">Date souhaitée</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2 block">Créneau</label>
                <div className="flex gap-2 flex-wrap">
                  {SLOTS.map(s => (
                    <button key={s} onClick={() => setForm(f => ({ ...f, slot: s }))} className="px-4 py-2 rounded-xl text-sm font-semibold border transition-colors"
                      style={form.slot === s
                        ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
                        : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
                    >{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2 block">Message (optionnel)</label>
                <textarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Objet du rendez-vous…" className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] resize-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-[var(--border-color)] text-sm font-semibold text-[var(--text-muted)] hover:bg-[var(--background-soft)]">Annuler</button>
              <button onClick={handleSend} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all" style={{ backgroundColor: sent ? '#16A34A' : 'var(--accent-primary)' }}>{sent ? 'Envoyé !' : 'Envoyer'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
