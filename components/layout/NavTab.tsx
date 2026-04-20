'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import NotificationBadge from './NotificationBadge';
import { cn } from '@/lib/utils';

interface NavTabProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
  roleColor: string;
  badgeCount?: number;
}

export default function NavTab({
  icon: Icon,
  label,
  href,
  isActive,
  roleColor,
  badgeCount,
}: NavTabProps) {
  return (
    <Link href={href} className="flex-1">
      <motion.div
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 600, damping: 20 }}
        className={cn(
          'flex flex-col items-center justify-center gap-0.5 py-2 w-full',
          isActive ? 'text-[var(--tab-color)]' : 'text-[var(--text-muted)]',
        )}
        style={{ '--tab-color': roleColor } as React.CSSProperties}
      >
        {/* Icon + pill indicator */}
        <div className="relative p-1.5">
          {isActive && (
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-0 rounded-xl"
              style={{ backgroundColor: `color-mix(in srgb, ${roleColor} 15%, transparent)` }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <div className="relative z-10">
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.75}
            />
            {badgeCount !== undefined && <NotificationBadge count={badgeCount} />}
          </div>
        </div>

        {/* Label — visible uniquement sur l'onglet actif */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-semibold leading-none"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
