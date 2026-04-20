'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, TrendingUp, Star, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const locale = useLocale();
  const isFr = locale === 'fr';
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
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

  return (
    <div className="min-h-screen flex">

      {/* ══════════════════════════════════════════
          PANNEAU GAUCHE — Image hero + branding
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">

        {/* Image de fond */}
        <Image
          src="/images/premiere_image.jpg"
          alt="PES — Pôle d'Excellence Scolaire"
          fill
          className="object-cover"
          sizes="52vw"
          priority
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(4,9,15,0.88) 0%, rgba(8,15,30,0.75) 50%, rgba(37,99,235,0.30) 100%)',
          }}
        />

        {/* Grain texture subtil */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
          }}
        />

        {/* Lueur bleue bas-droite */}
        <div
          className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(37,99,235,0.20)' }}
        />

        {/* Contenu positionné */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">

          {/* Logo + nom */}
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

          {/* Citation centrale */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-stretch gap-3">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(to bottom, #2563EB, #7C3AED)' }}
              />
              <div>
                <h2 className="font-display font-black text-3xl xl:text-4xl text-white leading-tight mb-2">
                  {isFr ? (
                    <>L&apos;école explique.<br /><span className="text-[#60A5FA]">Nous, on fait comprendre.</span></>
                  ) : (
                    <>School explains.<br /><span className="text-[#60A5FA]">We make it click.</span></>
                  )}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                  {isFr
                    ? 'Rejoignez plus de 500 familles qui font confiance au PES depuis 2014.'
                    : 'Join 500+ families who have trusted PES since 2014.'}
                </p>
              </div>
            </div>

            {/* Badges verts */}
            <div className="flex flex-col gap-2">
              {[
                isFr ? '10 ans d\'expertise pédagogique' : '10 years of teaching expertise',
                isFr ? 'Résultats garantis en 3 mois' : 'Guaranteed results in 3 months',
                isFr ? 'Suivi personnalisé 7j/7' : 'Personalised follow-up 7 days/7',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#34D399] flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social proof bas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="space-y-4"
          >
            {/* Carte flottante — stats */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(22,163,74,0.2)' }}
              >
                <TrendingUp size={15} className="text-[#34D399]" />
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">94%</p>
                <p className="text-white/50 text-[11px] mt-0.5">
                  {isFr ? 'taux de réussite aux examens' : 'exam success rate'}
                </p>
              </div>
            </div>

            {/* Étoiles */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#F59E0B" strokeWidth={0} className="text-amber-400" />
                ))}
              </div>
              <p className="text-white/50 text-xs">
                {isFr ? '500+ élèves accompagnés' : '500+ students supported'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PANNEAU DROIT — Formulaire
      ══════════════════════════════════════════ */}
      <div
        className="flex-1 flex flex-col justify-center px-6 sm:px-10 xl:px-16 py-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #060C1A 0%, #0A1228 50%, #06091A 100%)' }}
      >

        {/* Grille de points déco */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #2563EB 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Lueur haut-droite */}
        <div
          className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ background: '#2563EB' }}
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

          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <p className="text-[#60A5FA] text-xs font-semibold uppercase tracking-widest mb-2">
              {isFr ? 'Espace personnel' : 'Personal space'}
            </p>
            <h1 className="font-display font-black text-3xl text-white leading-tight">
              {t('title')}
            </h1>
            <p className="text-white/45 text-sm mt-1.5">{t('subtitle')}</p>
          </motion.div>

          {/* Formulaire */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                {t('email')}
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider">
                  {t('password')}
                </label>
                <Link
                  href={`/${locale}/auth/reset-password`}
                  className="text-xs text-[#60A5FA] hover:text-[#93C5FD] transition-colors"
                >
                  {t('forgot')}
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className={`${inputClass('password')} pr-12`}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Bouton submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{
                background: loading
                  ? 'linear-gradient(135deg, #1D4ED8, #6D28D9)'
                  : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 60%, #DB2777 100%)',
                boxShadow: loading ? 'none' : '0 8px 32px rgba(37,99,235,0.45)',
              }}
            >
              {/* Shine effect */}
              {!loading && (
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                  }}
                />
              )}
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {isFr ? 'Connexion…' : 'Signing in…'}
                </>
              ) : (
                <>
                  {t('submit')}
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/25 text-xs">{isFr ? 'ou' : 'or'}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Lien inscription */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-sm text-white/40"
          >
            {t('no_account')}{' '}
            <Link
              href={`/${locale}/auth/register`}
              className="text-[#60A5FA] font-semibold hover:text-[#93C5FD] transition-colors"
            >
              {isFr ? 'S\'inscrire' : 'Sign up'} →
            </Link>
          </motion.p>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-[11px] text-white/20 mt-8"
          >
            © {new Date().getFullYear()} Maison d&apos;Assistance Scolaire · Douala, Cameroun
          </motion.p>
        </div>
      </div>
    </div>
  );
}
