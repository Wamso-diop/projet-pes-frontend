'use client';

import { useState } from 'react';
import {
  FileText, Briefcase, Eye, CheckCircle, XCircle,
  Clock, Edit, Trash2, ExternalLink, ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ContentTab = 'blog' | 'careers';
type BlogStatus  = 'pending' | 'approved' | 'rejected' | 'draft';
type CareerStatus = 'pending' | 'interview' | 'approved' | 'rejected';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  status: BlogStatus;
  date: string;
  excerpt: string;
}

interface CareerApp {
  id: string;
  name: string;
  subject: string;
  experience: string;
  status: CareerStatus;
  date: string;
  email: string;
}

const BLOG_STATUS_STYLES: Record<BlogStatus, { label: string; bg: string; color: string; icon: typeof Clock }> = {
  pending:  { label: 'En attente',  bg: '#FEF3C7', color: '#D97706', icon: Clock },
  approved: { label: 'Publié',      bg: '#D1FAE5', color: '#16A34A', icon: CheckCircle },
  rejected: { label: 'Refusé',      bg: '#FEE2E2', color: '#EF4444', icon: XCircle },
  draft:    { label: 'Brouillon',   bg: '#F1F5F9', color: '#64748B', icon: Edit },
};

const CAREER_STATUS_STYLES: Record<CareerStatus, { label: string; bg: string; color: string }> = {
  pending:   { label: 'En attente',   bg: '#FEF3C7', color: '#D97706' },
  interview: { label: 'Entretien',    bg: '#EFF6FF', color: '#2563EB' },
  approved:  { label: 'Accepté',      bg: '#D1FAE5', color: '#16A34A' },
  rejected:  { label: 'Refusé',       bg: '#FEE2E2', color: '#EF4444' },
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1', title: 'Comment préparer le BEPC en 3 mois',
    author: 'Dr Mireille Eto', category: 'Conseils',
    status: 'approved', date: '15 mar. 2026',
    excerpt: 'Nos enseignants partagent leurs meilleures stratégies pour réussir le BEPC.',
  },
  {
    id: '2', title: '5 astuces pour aimer les mathématiques',
    author: 'Prof. Alain Mbida', category: 'Mathématiques',
    status: 'approved', date: '28 fév. 2026',
    excerpt: 'La peur des maths n\'est pas une fatalité. Voici comment la transformer.',
  },
  {
    id: '3', title: 'Maintenir la motivation scolaire toute l\'année',
    author: 'Admin PES', category: 'Bien-être',
    status: 'approved', date: '10 fév. 2026',
    excerpt: 'Des techniques concrètes pour aider votre enfant à rester motivé.',
  },
  {
    id: '4', title: 'La physique-chimie expliquée simplement',
    author: 'Dr Mireille Eto', category: 'Physique',
    status: 'pending', date: '19 avr. 2026',
    excerpt: 'Un guide pratique pour démystifier la physique-chimie au lycée.',
  },
  {
    id: '5', title: 'Réussir son orientation au lycée',
    author: 'Prof. Alain Mbida', category: 'Orientation',
    status: 'draft', date: '20 avr. 2026',
    excerpt: 'Choisir sa série au lycée : tout ce qu\'il faut savoir pour bien s\'orienter.',
  },
];

const CAREER_APPS: CareerApp[] = [
  { id: '1', name: 'Dr Mireille Eto',    subject: 'Physique-Chimie',     experience: '8 ans', status: 'pending',   date: '17 avr. 2026', email: 'm.eto@gmail.com' },
  { id: '2', name: 'M. Jules Nana',      subject: 'Mathématiques',       experience: '5 ans', status: 'pending',   date: '15 avr. 2026', email: 'j.nana@gmail.com' },
  { id: '3', name: 'Mme Claire Fouda',   subject: 'Français / Littérature', experience: '12 ans', status: 'interview', date: '10 avr. 2026', email: 'c.fouda@gmail.com' },
  { id: '4', name: 'M. Boris Atangana',  subject: 'Informatique',         experience: '4 ans', status: 'approved',  date: '5 avr. 2026',  email: 'b.atangana@gmail.com' },
  { id: '5', name: 'Mme Anne Tsogo',     subject: 'Anglais',              experience: '7 ans', status: 'rejected',  date: '2 avr. 2026',  email: 'a.tsogo@gmail.com' },
];

export default function AdminContentPage() {
  const [tab, setTab] = useState<ContentTab>('blog');
  const [blogFilter, setBlogFilter] = useState<BlogStatus | 'all'>('all');
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const filteredPosts = blogFilter === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.status === blogFilter);

  const pendingBlog    = BLOG_POSTS.filter((p) => p.status === 'pending').length;
  const pendingCareer  = CAREER_APPS.filter((c) => c.status === 'pending').length;

  return (
    <div className="p-4 md:p-6 space-y-4">

      {/* Tab switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('blog')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors',
            tab === 'blog'
              ? 'bg-[var(--accent-primary)] text-white shadow-[0_2px_8px_rgb(37_99_235/0.3)]'
              : 'bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)]',
          )}
        >
          <FileText size={15} />
          Blog
          {pendingBlog > 0 && (
            <span className={cn(
              'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
              tab === 'blog' ? 'bg-white/25 text-white' : 'bg-[#EF4444] text-white',
            )}>
              {pendingBlog}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab('careers')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors',
            tab === 'careers'
              ? 'bg-[var(--accent-primary)] text-white shadow-[0_2px_8px_rgb(37_99_235/0.3)]'
              : 'bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)]',
          )}
        >
          <Briefcase size={15} />
          Carrières
          {pendingCareer > 0 && (
            <span className={cn(
              'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
              tab === 'careers' ? 'bg-white/25 text-white' : 'bg-[#EF4444] text-white',
            )}>
              {pendingCareer}
            </span>
          )}
        </button>
      </div>

      {/* ─── BLOG TAB ─── */}
      {tab === 'blog' && (
        <div className="space-y-3">
          {/* Status filters */}
          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'pending', 'approved', 'draft', 'rejected'] as const).map((s) => {
              const count = s === 'all' ? BLOG_POSTS.length : BLOG_POSTS.filter((p) => p.status === s).length;
              const style = s !== 'all' ? BLOG_STATUS_STYLES[s] : null;
              return (
                <button
                  key={s}
                  onClick={() => setBlogFilter(s)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors',
                    blogFilter === s
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)]',
                  )}
                >
                  {s === 'all' ? 'Tous' : style!.label}
                  <span className={cn(
                    'px-1.5 py-0.5 rounded text-[10px] font-bold',
                    blogFilter === s ? 'bg-white/20 text-white' : 'bg-[var(--background-muted)] text-[var(--text-muted)]',
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Posts list */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] divide-y divide-[var(--border-color)]">
            {filteredPosts.map((post) => {
              const st = BLOG_STATUS_STYLES[post.status];
              const StatusIcon = st.icon;
              return (
                <div key={post.id} className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-[var(--text-primary)] leading-snug">{post.title}</h3>
                        <span
                          className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: st.bg, color: st.color }}
                        >
                          <StatusIcon size={10} />
                          {st.label}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mb-2 line-clamp-1">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                        <span>{post.author}</span>
                        <span>·</span>
                        <span
                          className="px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: 'var(--background-muted)', color: 'var(--text-secondary)' }}
                        >
                          {post.category}
                        </span>
                        <span>·</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)] transition-colors">
                      <Eye size={12} /> Aperçu
                    </button>
                    {post.status === 'pending' && (
                      <>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-[#D1FAE5] text-[#16A34A] font-semibold hover:opacity-80 transition-opacity">
                          <CheckCircle size={12} /> Publier
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-[#FEE2E2] text-[#EF4444] font-semibold hover:opacity-80 transition-opacity">
                          <XCircle size={12} /> Refuser
                        </button>
                      </>
                    )}
                    {post.status === 'approved' && (
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)] transition-colors">
                        <ExternalLink size={12} /> Voir
                      </button>
                    )}
                    <button className="ml-auto flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg text-[#EF4444] hover:bg-[#FEE2E2] transition-colors">
                      <Trash2 size={12} /> Supprimer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── CAREERS TAB ─── */}
      {tab === 'careers' && (
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] divide-y divide-[var(--border-color)]">
          {CAREER_APPS.map((app) => {
            const st = CAREER_STATUS_STYLES[app.status];
            const isOpen = expandedApp === app.id;
            return (
              <div key={app.id}>
                <button
                  onClick={() => setExpandedApp(isOpen ? null : app.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[var(--background-soft)] transition-colors text-left"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-[var(--background-muted)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)] flex-shrink-0">
                    {app.name.split(' ').map((n) => n[0]).join('').slice(-2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{app.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{app.subject} · {app.experience} d&apos;expérience</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: st.bg, color: st.color }}
                    >
                      {st.label}
                    </span>
                    <ChevronDown
                      size={14}
                      className={cn('text-[var(--text-muted)] transition-transform', isOpen && 'rotate-180')}
                    />
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-5 pb-4 border-t border-[var(--border-color)]/50 bg-[var(--background-soft)]">
                    <div className="pt-3 space-y-2">
                      <p className="text-xs text-[var(--text-secondary)]">
                        <span className="font-medium text-[var(--text-primary)]">Email : </span>
                        {app.email}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        <span className="font-medium text-[var(--text-primary)]">Reçu le : </span>
                        {app.date}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)] transition-colors">
                        <Eye size={12} /> Voir le CV
                      </button>
                      {app.status === 'pending' && (
                        <>
                          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#EFF6FF] text-[#2563EB] hover:opacity-80 transition-opacity">
                            Convoquer à un entretien
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#FEE2E2] text-[#EF4444] hover:opacity-80 transition-opacity">
                            <XCircle size={12} /> Refuser
                          </button>
                        </>
                      )}
                      {app.status === 'interview' && (
                        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#D1FAE5] text-[#16A34A] hover:opacity-80 transition-opacity">
                          <CheckCircle size={12} /> Valider l&apos;embauche
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
