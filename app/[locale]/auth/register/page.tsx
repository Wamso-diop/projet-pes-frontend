'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, CheckCircle2, Star, GraduationCap, Users, BookOpen } from 'lucide-react';

type Role = 'student' | 'parent' | '';

export default function RegisterPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [role, setRole] = useState<Role>('');
  const [step, setStep] = useState<1 | 2>(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
  }

  const inputBase =
    'w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200';

  const inputClass = (name: string) =>
    `${inputBase} ${
      focused === name
        ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 bg-white/10'
        : 'border-white/10 hover:border-white/20'
    }`;

  const roles = [
    {
      id: 'student' as Role,
      icon: <GraduationCap size={18} />,
      label: isFr ? 'Élève' : 'Student',
      desc: isFr ? 'Je suis en cours de scolarité' : 'I am a student',
    },
    {
      id: 'parent' as Role,
      icon: <Users size={18} />,
      label: isFr ? 'Parent' : 'Parent',
      desc: isFr ? 'J\'inscris mon enfant' : 'I enroll my child',
    },
  ];

  return (
    <div className="min-h-screen flex">

      {/* ══════════════════════════════════════════
          PANNEAU GAUCHE — Image hero + branding
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">

        <Image
          src="/images/premiere_image.jpg"
          alt="PES — Pôle d'Excellence Scolaire"
          fill
          className="object-cover object-center"
          sizes="52vw"
          priority
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(4,9,15,0.92) 0%, rgba(8,15,30,0.78) 45%, rgba(124,58,237,0.28) 100%)',
          }}
        />

        {/* Lueur violette bas-droite */}
        <div
          className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(124,58,237,0.22)' }}
        />

        {/* Grille de points */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #7C3AED 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg text-white flex-shrink-0 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
            >
              P
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Pôle d&apos;Excellence</p>
              <p className="text-white/50 text-xs">Scolaire • Douala</p>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-stretch gap-3">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(to bottom, #7C3AED, #DB2777)' }}
              />
              <div>
                <h2 className="font-display font-black text-3xl xl:text-4xl text-white leading-tight mb-2">
                  {isFr ? (
                    <>Commencez votre<br /><span className="text-[#A78BFA]">aventure scolaire.</span></>
                  ) : (
                    <>Start your<br /><span className="text-[#A78BFA]">academic journey.</span></>
                  )}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                  {isFr
                    ? 'Rejoignez le PES et donnez à votre enfant toutes les chances de réussir.'
                    : 'Join PES and give your child every chance to succeed.'}
                </p>
              </div>
            </div>

            {/* Étapes visuelles */}
            <div className="space-y-3">
              {[
                { icon: <BookOpen size={14} />, label: isFr ? 'Choisissez vos matières' : 'Choose your subjects' },
                { icon: <GraduationCap size={14} />, label: isFr ? 'Un enseignant dédié' : 'A dedicated teacher' },
                { icon: <CheckCircle2 size={14} />, label: isFr ? 'Progressez chaque semaine' : 'Progress every week' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[#A78BFA]"
                    style={{ background: 'rgba(124,58,237,0.18)' }}
                  >
                    {icon}
                  </div>
                  <span className="text-white/65 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3">
              <div className="flex -space-x-2">
                {[
                  { initials: 'NK', bg: '#2563EB' },
                  { initials: 'AB', bg: '#16A34A' },
                  { initials: 'CM', bg: '#D97706' },
                  { initials: 'DP', bg: '#7C3AED' },
                ].map(({ initials, bg }) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full border-2 border-white/10 flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: bg }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">500+</p>
                <p className="text-white/45 text-[11px] mt-0.5">
                  {isFr ? 'élèves inscrits' : 'enrolled students'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#F59E0B" strokeWidth={0} className="text-amber-400" />
                ))}
              </div>
              <p className="text-white/45 text-xs">
                {isFr ? 'Note moyenne des parents' : 'Average parent rating'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PANNEAU DROIT — Formulaire inscription
      ══════════════════════════════════════════ */}
      <div
        className="flex-1 flex flex-col justify-center px-6 sm:px-10 xl:px-16 py-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #060C1A 0%, #0A1228 50%, #06091A 100%)' }}
      >

        {/* Grille déco */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #7C3AED 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Lueur */}
        <div
          className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-15"
          style={{ background: '#7C3AED' }}
        />

        <div className="relative z-10 w-full max-w-sm mx-auto">

          {/* Logo mobile */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex lg:hidden items-center gap-3 mb-10"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base text-white"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
            >
              M
            </div>
            <p className="text-white font-bold text-sm">Maison d&apos;Assistance Scolaire</p>
          </motion.div>

          {/* Progress steps */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-7"
          >
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                  style={{
                    background:
                      step >= s
                        ? 'linear-gradient(135deg, #2563EB, #7C3AED)'
                        : 'rgba(255,255,255,0.08)',
                    color: step >= s ? '#fff' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {step > s ? '✓' : s}
                </div>
                <span className={`text-xs ${step === s ? 'text-white/70' : 'text-white/25'}`}>
                  {s === 1
                    ? isFr ? 'Votre profil' : 'Your profile'
                    : isFr ? 'Accès sécurisé' : 'Secure access'}
                </span>
                {s < 2 && <div className="w-6 h-px bg-white/15 ml-1" />}
              </div>
            ))}
          </motion.div>

          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-7"
          >
            <p className="text-[#A78BFA] text-xs font-semibold uppercase tracking-widest mb-2">
              {isFr ? 'Créer un compte' : 'Create an account'}
            </p>
            <h1 className="font-display font-black text-3xl text-white leading-tight">
              {step === 1
                ? isFr ? 'Bienvenue chez PES' : 'Welcome to PES'
                : isFr ? 'Sécurisez votre accès' : 'Secure your access'}
            </h1>
            <p className="text-white/40 text-sm mt-1.5">
              {step === 1
                ? isFr ? 'Dites-nous qui vous êtes' : 'Tell us who you are'
                : isFr ? 'Créez votre mot de passe' : 'Create your password'}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">

              {/* ── ÉTAPE 1 ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Sélection rôle */}
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      {isFr ? 'Je suis…' : 'I am…'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map(({ id, icon, label, desc }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setRole(id)}
                          className="flex flex-col items-start gap-1.5 p-3.5 rounded-xl border text-left transition-all duration-200"
                          style={{
                            background: role === id ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.04)',
                            borderColor: role === id ? '#2563EB' : 'rgba(255,255,255,0.10)',
                            boxShadow: role === id ? '0 0 0 1px #2563EB30' : 'none',
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{
                              background: role === id ? 'rgba(37,99,235,0.25)' : 'rgba(255,255,255,0.06)',
                              color: role === id ? '#60A5FA' : 'rgba(255,255,255,0.35)',
                            }}
                          >
                            {icon}
                          </div>
                          <p className={`text-sm font-semibold leading-none ${role === id ? 'text-white' : 'text-white/50'}`}>
                            {label}
                          </p>
                          <p className={`text-[11px] leading-tight ${role === id ? 'text-white/50' : 'text-white/25'}`}>
                            {desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prénom + Nom */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                        {isFr ? 'Prénom' : 'First name'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isFr ? 'Jean' : 'John'}
                        className={inputClass('first_name')}
                        onFocus={() => setFocused('first_name')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                        {isFr ? 'Nom' : 'Last name'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isFr ? 'Dupont' : 'Doe'}
                        className={inputClass('last_name')}
                        onFocus={() => setFocused('last_name')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      {isFr ? 'Téléphone' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+237 6XX XXX XXX"
                      className={inputClass('phone')}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    disabled={!role}
                    className="relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 60%, #DB2777 100%)',
                      boxShadow: role ? '0 8px 32px rgba(37,99,235,0.45)' : 'none',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                      }}
                    />
                    {isFr ? 'Continuer' : 'Continue'}
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              )}

              {/* ── ÉTAPE 2 ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      {isFr ? 'Adresse email' : 'Email address'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vous@exemple.cm"
                      className={inputClass('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      {isFr ? 'Mot de passe' : 'Password'}
                    </label>
                    <div className="relative">
                      <input
                        type={showPwd ? 'text' : 'password'}
                        required
                        minLength={8}
                        placeholder="8 caractères minimum"
                        className={`${inputClass('password')} pr-12`}
                        onFocus={() => setFocused('password')}
                        onBlur={() => setFocused(null)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(!showPwd)}
                        tabIndex={-1}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                      >
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirmation mot de passe */}
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                      {isFr ? 'Confirmer le mot de passe' : 'Confirm password'}
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className={inputClass('confirm')}
                      onFocus={() => setFocused('confirm')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  {/* CGU */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-[#2563EB] flex-shrink-0"
                    />
                    <span className="text-xs text-white/40 leading-relaxed">
                      {isFr
                        ? "J'accepte les conditions d'utilisation et la politique de confidentialité du PES."
                        : "I accept PES's terms of service and privacy policy."}
                    </span>
                  </label>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center px-4 py-4 rounded-xl border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 text-sm font-medium transition-all duration-200"
                    >
                      ←
                    </button>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileTap={{ scale: 0.98 }}
                      className="relative flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: loading
                          ? 'linear-gradient(135deg, #1D4ED8, #6D28D9)'
                          : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 60%, #DB2777 100%)',
                        boxShadow: loading ? 'none' : '0 8px 32px rgba(37,99,235,0.45)',
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                        }}
                      />
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          {isFr ? 'Inscription…' : 'Signing up…'}
                        </>
                      ) : (
                        <>
                          {isFr ? 'Créer mon compte' : 'Create my account'}
                          <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/25 text-xs">{isFr ? 'déjà inscrit ?' : 'already registered?'}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Lien connexion */}
          <p className="text-center text-sm text-white/40">
            {isFr ? 'Vous avez déjà un compte ?' : 'Already have an account?'}{' '}
            <Link
              href={`/${locale}/auth/login`}
              className="text-[#60A5FA] font-semibold hover:text-[#93C5FD] transition-colors"
            >
              {isFr ? 'Se connecter' : 'Sign in'} →
            </Link>
          </p>

          <p className="text-center text-[11px] text-white/20 mt-8">
            © {new Date().getFullYear()} Maison d&apos;Assistance Scolaire · Douala, Cameroun
          </p>
        </div>
      </div>
    </div>
  );
}
