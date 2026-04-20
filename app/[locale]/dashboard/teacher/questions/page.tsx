'use client';
import { useState } from 'react';
import { HelpCircle, Send, CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  { id: 1, student: 'Emma Fouda',  avatar: 'EF', color: '#2563EB', class: '3e A',   time: 'Il y a 20 min', answered: false,
    question: "Comment trouve-t-on le discriminant quand il y a un coefficient devant x² ?",
    answer: null },
  { id: 2, student: 'Paul Nkeng',  avatar: 'PN', color: '#7C3AED', class: '3e B',   time: 'Il y a 1h',     answered: false,
    question: "Quelle est la différence entre Δ>0, Δ=0 et Δ<0 dans les équations du second degré ?",
    answer: null },
  { id: 3, student: 'Sara Biyong', avatar: 'SB', color: '#16A34A', class: '2nde C', time: 'Hier',           answered: false,
    question: "L'exercice 5 du chapitre 4 n'est pas clair. On nous demande de tracer f(x) mais on n'a pas f.",
    answer: null },
  { id: 4, student: "Marc Eto'o",  avatar: 'ME', color: '#D97706', class: '3e A',   time: '2 jours',        answered: true,
    question: "Les exercices 12 à 15 sont-ils au programme du devoir de vendredi ?",
    answer: "Oui, les exercices 12 à 15 sont inclus. Révisez aussi les démonstrations du théorème de Viète." },
  { id: 5, student: 'Lucie Bello', avatar: 'LB', color: '#EF4444', class: '3e B',   time: '3 jours',        answered: true,
    question: "Comment simplifie-t-on une expression avec des radicaux au dénominateur ?",
    answer: "Il faut rationaliser le dénominateur en multipliant par son conjugué. Ex: 1/√2 = √2/2." },
];

export default function TeacherQuestions() {
  const [tab, setTab] = useState<'pending' | 'answered'>('pending');
  const [selected, setSelected] = useState<number | null>(1);
  const [reply, setReply] = useState('');

  const list = QUESTIONS.filter(q => tab === 'pending' ? !q.answered : q.answered);
  const active = QUESTIONS.find(q => q.id === selected);
  const pendingCount = QUESTIONS.filter(q => !q.answered).length;

  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-5">
      <div>
        <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Questions des élèves</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">{pendingCount} en attente de réponse</p>
      </div>

      <div className="flex gap-2">
        {(['pending', 'answered'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setSelected(null); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
            style={tab === t
              ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
              : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >
            {t === 'pending' ? 'En attente' : 'Répondues'}
            {t === 'pending' && pendingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-xs font-bold flex items-center justify-center">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5" style={{ minHeight: '60vh' }}>

        {/* List */}
        <div className="lg:col-span-2 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="divide-y divide-[var(--border-color)]">
            {list.length === 0 && (
              <div className="p-10 text-center">
                <CheckCircle2 size={36} className="mx-auto mb-3 text-[#16A34A]" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">Tout est répondu !</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Aucune question en attente</p>
              </div>
            )}
            {list.map(({ id, student, avatar, color, class: cls, time, answered }) => (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[var(--background-soft)] transition-colors"
                style={selected === id ? { backgroundColor: 'var(--background-muted)' } : {}}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: color }}>
                  {avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{student}</p>
                  <p className="text-xs text-[var(--text-muted)]">{cls} · {time}</p>
                </div>
                {!answered && <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-3 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden flex flex-col">
          {active ? (
            <>
              <div className="px-6 py-5 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: active.color }}>
                    {active.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{active.student}</p>
                    <p className="text-xs text-[var(--text-muted)]">{active.class} · {active.time}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--background-soft)] p-4">
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{active.question}</p>
                </div>
              </div>

              {active.answered && active.answer ? (
                <div className="px-6 py-5">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">Votre réponse</p>
                  <div className="rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] p-4">
                    <p className="text-sm text-[#166534] leading-relaxed">{active.answer}</p>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-5 flex-1 flex flex-col">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">Votre réponse</p>
                  <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder="Rédigez votre réponse…"
                    rows={6}
                    className="flex-1 w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] resize-none"
                  />
                  <button className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                    <Send size={15} /> Envoyer la réponse
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <HelpCircle size={40} className="text-[var(--text-muted)] mb-3 opacity-30" />
              <p className="font-semibold text-[var(--text-primary)]">Sélectionnez une question</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">La question et votre zone de réponse apparaîtront ici</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
