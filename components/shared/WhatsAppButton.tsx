'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.a
      href="https://wa.me/237600000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={mounted ? { scale: 0 } : false}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="
        fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6
        w-14 h-14 rounded-full
        bg-[#25D366] text-white
        flex items-center justify-center
        shadow-[0_4px_20px_rgba(37,211,102,0.4)]
        transition-shadow hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)]
      "
      aria-label="Nous contacter sur WhatsApp"
    >
      <MessageCircle size={26} strokeWidth={1.75} />
    </motion.a>
  );
}
