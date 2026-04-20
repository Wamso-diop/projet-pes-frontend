import { BookOpen, HelpCircle, BarChart2, Users, ChevronRight, Clock, CheckCircle2, Upload } from 'lucide-react';
import Link from 'next/link';

const TEACHER = { name: 'Prof. Alain Mbida', subject: 'Mathématiques', classes: ['3e A', '3e B', '2nde C'], students: 54 };

const TODAY_CLASSES = [
  { class: '3e A',   time: '14h–16h', room: 'Salle 1', topic: 'Équations du 2nd degré', done: true  },
  { class: '3e B',   time: '16h–18h', room: 'Salle 1', topic: 'Équations du 2nd degré', done: false },
  { class: '2nde C', time: '18h–19h', room: 'Salle 4', topic: 'Fonctions affines',       done: false },
];

const PENDING_QUESTIONS = [
  { student: 'Emma Fouda',  question: "Je ne comprends pas la correction de l'ex. 3…", class: '3e A',   time: '20 min' },
  { student: 'Paul Nkeng',  question: 'Quelle est la différence entre Δ>0 et Δ=0 ?',  class: '3e B',   time: '1h'     },
  { student: 'Sara Biyong', question: "L'exercice 5 du chapitre 4 n'est pas clair.",   class: '2nde C', time: 'Hier'   },
];

const CLASS_STATS = [
  { class: '3e A',   avg: 14.8, students: 18, top: 'Emma Fouda',  color: '#2563EB', pct: 74 },
  { class: '3e B',   avg: 13.2, students: 19, top: 'Paul Nkeng',  color: '#7C3AED', pct: 66 },
  { class: '2nde C', avg: 15.6, students: 17, top: 'Sara Biyong', color: '#16A34A', pct: 78 },
];

const RECENT_RESOURCES = [
  { title: 'Exercices — Équations du 2nd degré', type: 'PDF',   downloads: 42, date: 'Hier'    },
  { title: 'Cours — Fonctions affines',           type: 'PDF',   downloads: 31, date: '17 avr.' },
  { title: 'Fiche — Trigonométrie',               type: 'Fiche', downloads: 28, date: '15 avr.' },
];

const TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  PDF:   { bg: '#EFF6FF', color: '#2563EB' },
  Fiche: { bg: '#F0FDF4', color: '#16A34A' },
};

export default function TeacherDashboard() {
  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-6">

      {/* Welcome banner */}
      <div
        className="rounded-2xl p-5 md:p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
      >
        <div className="relative z-10">
          <p className="text-white/70 text-sm mb-1">Bonjour 👋</p>
          <h1 className="font-display font-black text-2xl md:text-3xl">{TEACHER.name}</h1>
          <p className="text-white/65 text-sm mt-1">{TEACHER.subject} · PES Douala</p>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
              <Users size={15} className="text-white/80" />
              <span className="text-white font-bold">{TEACHER.students} élèves</span>
            </div>
            {TEACHER.classes.map(cls => (
              <span key={cls} className="bg-white/15 text-white text-sm font-semibold px-3 py-1.5 rounded-xl">{cls}</span>
            ))}
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -right-2 -bottom-8 w-48 h-48 rounded-full bg-white/5" />
      </div>

      {/* Today's classes */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[var(--accent-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">Mes cours aujourd&apos;hui</h2>
          </div>
          <span className="text-xs font-medium text-[var(--text-muted)]">
            {TODAY_CLASSES.filter(c => c.done).length}/{TODAY_CLASSES.length} terminés
          </span>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {TODAY_CLASSES.map(({ class: cls, time, room, topic, done }) => (
            <div key={cls + time} className="flex items-center gap-4 px-5 py-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: done ? '#F0FDF4' : '#EFF6FF', color: done ? '#16A34A' : '#2563EB' }}
              >
                {done ? <CheckCircle2 size={18} /> : <BookOpen size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {cls} <span className="text-[var(--text-muted)] font-normal">— {topic}</span>
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{time} · {room}</p>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                style={done
                  ? { backgroundColor: '#D1FAE5', color: '#16A34A' }
                  : { backgroundColor: '#EFF6FF', color: '#2563EB' }}
              >
                {done ? 'Terminé' : 'À venir'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Pending questions */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <HelpCircle size={16} className="text-[#EF4444]" />
              <h2 className="font-semibold text-[var(--text-primary)]">Questions en attente</h2>
              <span className="text-xs font-bold w-5 h-5 rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center">
                {PENDING_QUESTIONS.length}
              </span>
            </div>
            <Link href="questions" className="text-sm text-[var(--accent-primary)] hover:underline flex items-center gap-0.5">
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {PENDING_QUESTIONS.map(({ student, question, class: cls, time }) => (
              <div key={student} className="flex items-start gap-3 px-5 py-4 hover:bg-[var(--background-soft)] transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center text-xs font-bold text-[#2563EB] flex-shrink-0 mt-0.5">
                  {student.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{student}</p>
                    <span className="text-xs text-[var(--text-muted)] flex-shrink-0">{time}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] truncate">{question}</p>
                  <span className="text-xs font-medium text-[#7C3AED] mt-1 inline-block">{cls}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class performance */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <BarChart2 size={16} className="text-[var(--accent-primary)]" />
              <h2 className="font-semibold text-[var(--text-primary)]">Performances par classe</h2>
            </div>
            <Link href="grades" className="text-sm text-[var(--accent-primary)] hover:underline flex items-center gap-0.5">
              Notes <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {CLASS_STATS.map(({ class: cls, avg, students, top, color, pct }) => (
              <div key={cls} className="px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{cls}</p>
                    <p className="text-xs text-[var(--text-muted)]">{students} élèves · 1er : {top}</p>
                  </div>
                  <span className="text-2xl font-display font-black" style={{ color }}>{avg}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--background-muted)]">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent resources */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[var(--accent-primary)]" />
              <h2 className="font-semibold text-[var(--text-primary)]">Ressources publiées</h2>
            </div>
            <Link href="resources" className="text-sm text-[var(--accent-primary)] hover:underline flex items-center gap-0.5">
              Gérer <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {RECENT_RESOURCES.map(({ title, type, downloads, date }) => {
              const ts = TYPE_STYLE[type] ?? { bg: '#F3F4F6', color: '#6B7280' };
              return (
                <div key={title} className="flex items-center gap-3 px-5 py-4 hover:bg-[var(--background-soft)] transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" style={ts}>
                    {type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{title}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{downloads} téléchargements · {date}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-5 py-4 border-t border-[var(--border-color)]">
            <Link
              href="resources"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Upload size={15} /> Publier une ressource
            </Link>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: HelpCircle, label: 'Répondre\naux questions', href: 'questions', color: '#EF4444', bg: '#FEF2F2', count: 3 },
            { icon: Upload,     label: 'Publier une\nressource',   href: 'resources', color: '#2563EB', bg: '#EFF6FF', count: 0 },
            { icon: BarChart2,  label: 'Saisir\nles notes',        href: 'grades',    color: '#16A34A', bg: '#F0FDF4', count: 0 },
            { icon: Users,      label: 'Voir mes\nélèves',         href: '#',         color: '#7C3AED', bg: '#F5F3FF', count: 0 },
          ].map(({ icon: Icon, label, href, color, bg, count }) => (
            <Link
              key={label}
              href={href}
              className="relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] transition-all text-center"
            >
              {count > 0 && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#EF4444] text-white text-xs font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={22} style={{ color }} />
              </div>
              <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug whitespace-pre-line">{label}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
