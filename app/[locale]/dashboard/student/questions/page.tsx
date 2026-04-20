'use client';
import { useState } from 'react';
import { HelpCircle, Send, Plus, CheckCircle2 } from 'lucide-react';

const MY_QUESTIONS = [
  { id: 1, question: "Comment trouve-t-on le discriminant quand il y a un coefficient devant x² ?",
    subject: 'Maths', teacher: 'M. Mbida', asked: 'Il y a 20 min', answered: false, answer: null },
  { id: 2, question: "Quelle est la différence entre une réaction endothermique et exothermique ?",
    subject: 'Physique', teacher: 'Dr Eto', asked: 'Hier', answered: true,
    answer: "Une réaction endothermique absorbe de la chaleur (ΔH > 0) tandis qu'une réaction exothermique en libère (ΔH < 0). La combustion est un exemple de réaction exothermique." },
  { id: 3, question: "Pour le DS de vendredi, les démonstrations sont-elles au programme ?",
    subject: 'Maths', teacher: 'M. Mbida', asked: '3 jours', answered: true,
    answer: "Oui, les démonstrations des théorèmes du chapitre 3 sont au programme. Révisez bien le théorème de Viète." },
];

const SUBJECTS = ['Maths', 'Physique', 'Histoire', 'Français', 'Anglais'];

export default function StudentQuestions() {
  const [tab, setTab] = useState<'my' | 'new'>('my');
  const [selected, setSelected] = useState<number | null>(null);
  const [newQ, setNewQ] = useState({ subject: '', question: '' });
  const [submitted, setSubmitted] = useState(false);

  const active = MY_QUESTIONS.find(q => q.id === selected);
  const pending = MY_QUESTIONS.filter(q => !q.answered).length;

  const handleSubmit = () => {
    if (newQ.subject && newQ.question.length >= 10) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setNewQ({ subject: '', question: '' }); setTab('my'); }, 2000);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-5">
      <div>
        <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Questions</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">{pending > 0 ? `${pending} en attente de réponse` : 'Toutes vos questions ont été répondues'}</p>
      </div>

      <div className="flex gap-2">
        {([['my', 'Mes questions'], ['new', 'Nouvelle question']] as const).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
            style={tab === t
              ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
              : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >
            {t === 'new' && <Plus size={14} />} {label}
          </button>
        ))}
      </div>

      {tab === 'my' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5" style={{ minHeight: '60vh' }}>
          <div className="lg:col-span-2 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
            <div className="divide-y divide-[var(--border-color)]">
              {MY_QUESTIONS.map(({ id, question, subject, teacher, asked, answered }) => (
                <button key={id} onClick={() => setSelected(id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[var(--background-soft)] transition-colors"
                  style={selected === id ? { backgroundColor: 'var(--background-muted)' } : {}}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${answered ? 'bg-[#F0FDF4]' : 'bg-[#EFF6FF]'}`}>
                    {answered
                      ? <CheckCircle2 size={18} className="text-[#16A34A]" />
                      : <HelpCircle size={18} className="text-[#2563EB]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] line-clamp-2 leading-snug">{question}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{subject} · {teacher} · {asked}</p>
                  </div>
                  {!answered && <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden flex flex-col">
            {active ? (
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">Votre question · {active.subject} · {active.teacher}</p>
                  <div className="rounded-xl bg-[var(--background-soft)] p-4">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{active.question}</p>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-2">{active.asked}</p>
                </div>
                {active.answered && active.answer ? (
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">Réponse du professeur</p>
                    <div className="rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={15} className="text-[#16A34A]" />
                        <p className="text-xs font-semibold text-[#16A34A]">Répondu par {active.teacher}</p>
                      </div>
                      <p className="text-sm text-[#166534] leading-relaxed">{active.answer}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] p-4 text-center">
                    <p className="text-sm font-semibold text-[#1D4ED8]">En attente de réponse</p>
                    <p className="text-xs text-[#3B82F6] mt-1">Votre professeur vous répondra bientôt</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <HelpCircle size={40} className="text-[var(--text-muted)] mb-3 opacity-30" />
                <p className="font-semibold text-[var(--text-primary)]">Sélectionnez une question</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">La question et la réponse apparaîtront ici</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'new' && (
        <div className="max-w-xl space-y-4">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 space-y-4">
            <h2 className="font-semibold text-[var(--text-primary)]">Poser une question à votre professeur</h2>
            <div>
              <label className="text-xs font-semibold text-[var(--text-muted)] mb-2 block uppercase tracking-wide">Matière</label>
              <select
                value={newQ.subject}
                onChange={e => setNewQ(q => ({ ...q, subject: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
              >
                <option value="">Sélectionner une matière…</option>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-muted)] mb-2 block uppercase tracking-wide">Votre question</label>
              <textarea
                value={newQ.question}
                onChange={e => setNewQ(q => ({ ...q, question: e.target.value }))}
                placeholder="Décrivez votre question en détail…"
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] resize-none"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1.5">{newQ.question.length} / 500 caractères</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!newQ.subject || newQ.question.length < 10}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-40"
              style={{ backgroundColor: submitted ? '#16A34A' : 'var(--accent-primary)' }}
            >
              <Send size={15} /> {submitted ? 'Question envoyée !' : 'Envoyer la question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
