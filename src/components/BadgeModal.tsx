import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PillBadge } from '@/lib/types';
import { PillBadge3D } from './PillBadge3D';
import { X, Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface BadgeModalProps {
  badge: PillBadge | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ badge, isOpen, onClose }) => {
  if (!badge) return null;

  const getMaterialDetails = (material: string) => {
    switch (material) {
      case 'ceramic':
        return {
          name: 'Matte White Ceramic (#E5E5E5)',
          composition: 'Zirconia toughened ceramic with dark micro-engraved typography',
          finish: 'Dual-bevel specular inner shadow, anti-reflective matte coating',
          hardness: '9.2 Mohs Scale',
        };
      case 'gunmetal':
        return {
          name: 'Brushed Gunmetal (#262626)',
          composition: 'Anodized aerospace aluminum with micro-abrasion brushing',
          finish: 'Low-albedo matte charcoal with specular top edge bevel',
          hardness: '8.4 Mohs Scale',
        };
      case 'silver':
        return {
          name: 'Raw Silver (#A3A3A3)',
          composition: 'Precision-stamped unpolished nickel silver alloy',
          finish: 'Radial satin texture with dark micro-relief lettering',
          hardness: '7.8 Mohs Scale',
        };
      case 'chartreuse':
      default:
        return {
          name: 'Warm Chartreuse / Olive (#A3E635)',
          composition: 'Phosphor-infused polymer resin core with ceramic shield',
          finish: 'High-contrast studio olive with high-refraction edge glow',
          hardness: '8.8 Mohs Scale',
        };
    }
  };

  const matDetails = getMaterialDetails(badge.material);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 transition-opacity"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-surface border border-hairline rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-elevated border border-hairline flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Top Medal Header */}
              <div className="flex items-center space-x-2 text-studio-olive font-editorial text-[10px] font-bold uppercase tracking-[0.25em]">
                <Award size={14} />
                <span>AUTHENTIC COLLECTIBLE MEDAL</span>
              </div>

              {/* 3D Tactile Pill Badge in center */}
              <div className="py-2 transform hover:scale-110 transition-transform">
                <PillBadge3D badge={badge} />
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-scoreboard text-4xl font-bold uppercase text-white tracking-tight">
                  {badge.title}
                </h3>
                <span className="font-editorial text-[11px] text-studio-olive font-bold uppercase tracking-widest block mt-1">
                  SUBTITLE: {badge.subtitle}
                </span>
                <p className="font-editorial text-xs text-neutral-300 mt-2 max-w-sm leading-relaxed">
                  {badge.description}
                </p>
              </div>

              {/* Material & Physical Specifications Table */}
              <div className="w-full p-4 rounded-2xl bg-surface-subtle border border-hairline font-editorial text-[11px] text-left space-y-2">
                <div className="flex justify-between border-b border-hairline pb-1.5">
                  <span className="text-neutral-500 uppercase">Material Class</span>
                  <span className="text-white font-medium">{matDetails.name}</span>
                </div>
                <div className="flex justify-between border-b border-hairline pb-1.5">
                  <span className="text-neutral-500 uppercase">Composition</span>
                  <span className="text-neutral-300 text-right max-w-[200px] truncate">{matDetails.composition}</span>
                </div>
                <div className="flex justify-between border-b border-hairline pb-1.5">
                  <span className="text-neutral-500 uppercase">Hardness Rating</span>
                  <span className="text-studio-olive font-mono">{matDetails.hardness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase">Awarded State</span>
                  <span className="text-studio-olive font-bold flex items-center space-x-1">
                    <CheckCircle2 size={12} />
                    <span>Unlocked ({badge.unlockedAt || 'Certified'})</span>
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-white text-black font-editorial text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg"
              >
                Inspect Next Badge
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
