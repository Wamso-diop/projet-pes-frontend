import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, GraduationCap, Heart, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? "Rejoignez l'équipe PES | Carrières"
      : "Join the PES team | Careers",
    description: locale === 'fr'
      ? "Devenez enseignant au Pôle d'Excellence Scolaire à Douala. Partagez votre passion pour l'enseignement."
      : "Become a teacher at Pôle d'Excellence Scolaire in Douala. Share your passion for teaching.",
  };
}

const JOBS = [
  {
    title: 'Professeur de Mathématiques',
    level: 'Collège / Lycée',
    type: 'Temps partiel',
    location: 'Douala, Cameroun',
    color: '#2563EB',
    bg: '#EFF6FF',
    requirements: ['Licence en Mathématiques ou équivalent', 'Expérience en enseignement appréciée', 'Passion pour la pédagogie'],
  },
  {
    title: 'Professeur de Physique-Chimie',
    level: 'Collège / Lycée',
    type: 'Temps partiel',
    location: 'Douala, Cameroun',
    color: '#7C3AED',
    bg: '#F5F3FF',
    requirements: ['Licence en Physique-Chimie ou équivalent', 'Maîtrise des programmes nationaux', 'Capacité à vulgariser les concepts'],
  },
  {
    title: 'Professeur de Français',
    level: 'Primaire / Collège',
    type: 'Temps partiel',
    location: 'Douala, Cameroun',
    color: '#D97706',
    bg: '#FFFBEB',
    requirements: ['Formation en Lettres Modernes', 'Excellente expression écrite et orale', 'Patience et sens de la pédagogie'],
  },
  {
    title: 'Professeur d\'Anglais',
    level: 'Tous niveaux',
    type: 'Temps partiel',
    location: 'Douala, Cameroun',
    color: '#16A34A',
    bg: '#F0FDF4',
    requirements: ['Niveau C1/C2 en anglais', 'Expérience en enseignement souhaitée', 'Dynamisme et adaptabilité'],
  },
];

const PERKS = [
  { icon: Heart, label: 'Environnement bienveillant', desc: 'Une équipe soudée qui valorise chaque enseignant' },
  { icon: GraduationCap, label: 'Formation continue', desc: 'Accès à des formations pédagogiques régulières' },
  { icon: Clock, label: 'Flexibilité des horaires', desc: 'Emplois du temps adaptés à vos disponibilités' },
  { icon: Briefcase, label: 'Rémunération attractive', desc: 'Tarifs compétitifs et paiement ponctuel' },
];

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* Hero */}
      <div
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -right-10 -bottom-16 w-96 h-96 rounded-full bg-white/5" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {isFr ? 'Nous recrutons !' : "We're hiring!"}
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white leading-tight mb-5">
            {isFr ? 'Rejoignez l\'équipe PES' : 'Join the PES team'}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {isFr
              ? 'Partagez votre passion pour l\'enseignement et contribuez à la réussite des élèves de Douala depuis 2014.'
              : 'Share your passion for teaching and contribute to the success of students in Douala since 2014.'}
          </p>
          <a
            href="mailto:recrutement@pes-douala.cm"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#2563EB] font-semibold hover:bg-white/90 transition-all shadow-[0_8px_30px_rgb(0_0_0/0.2)]"
          >
            {isFr ? 'Postuler maintenant' : 'Apply now'}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Perks */}
        <div>
          <h2 className="font-display font-black text-2xl md:text-3xl text-[var(--text-primary)] mb-2 text-center">
            {isFr ? 'Pourquoi rejoindre PES ?' : 'Why join PES?'}
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-8">
            {isFr ? 'Un cadre de travail valorisant et stimulant' : 'A rewarding and stimulating work environment'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-5 text-center hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-[var(--accent-primary)]" />
                </div>
                <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">{label}</p>
                <p className="text-xs text-[var(--text-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs */}
        <div>
          <h2 className="font-display font-black text-2xl md:text-3xl text-[var(--text-primary)] mb-2">
            {isFr ? 'Postes ouverts' : 'Open positions'}
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            {isFr ? `${JOBS.length} postes disponibles` : `${JOBS.length} positions available`}
          </p>
          <div className="space-y-4">
            {JOBS.map(({ title, level, type, location, color, bg, requirements }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: bg, color }}
                    >
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] text-base">{title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--background-soft)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                          <GraduationCap size={11} /> {level}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--background-soft)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                          <Clock size={11} /> {type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--background-soft)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                          <MapPin size={11} /> {location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="mailto:recrutement@pes-douala.cm"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: color }}
                  >
                    {isFr ? 'Postuler' : 'Apply'}
                    <ArrowRight size={15} />
                  </a>
                </div>
                <div className="px-5 md:px-6 pb-5 border-t border-[var(--border-color)]">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3 mt-4">
                    {isFr ? 'Profil recherché' : 'Requirements'}
                  </p>
                  <ul className="space-y-1.5">
                    {requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spontaneous application */}
        <div
          className="rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
        >
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -left-4 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="relative z-10">
            <h3 className="font-display font-black text-2xl text-white mb-2">
              {isFr ? 'Candidature spontanée' : 'Spontaneous application'}
            </h3>
            <p className="text-white/75 mb-6 max-w-md mx-auto">
              {isFr
                ? 'Votre matière n\'est pas listée ? Envoyez-nous votre CV, nous sommes toujours ouverts aux talents.'
                : "Your subject isn't listed? Send us your CV, we're always open to talent."}
            </p>
            <a
              href="mailto:recrutement@pes-douala.cm"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#2563EB] font-semibold hover:bg-white/90 transition-all"
            >
              {isFr ? 'Envoyer mon CV' : 'Send my CV'}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
