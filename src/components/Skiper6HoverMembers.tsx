import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BuilderMember } from '@/lib/types';
import { useClub } from '@/lib/ClubContext';

interface Skiper6HoverMembersProps {
  members: BuilderMember[];
  className?: string;
}

/**
 * Skiper UI Component #6: Hover Members Showcase
 * Native Framer Motion implementation with zero-error self-containment.
 * Staggered split-character vertical roll reveal in Antonio typography,
 * smooth avatar expansion, and member switching.
 */
export const Skiper6HoverMembers: React.FC<Skiper6HoverMembersProps> = ({
  members,
  className = '',
}) => {
  const { activeMember, switchMember } = useClub();
  const [hoveredMember, setHoveredMember] = useState<BuilderMember | null>(null);

  const displayedMember = hoveredMember || activeMember;
  const memberNameChars = displayedMember.name.toUpperCase().split('');

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Curved SVG Arch Title above avatars */}
      <div className="w-full flex justify-center mb-1">
        <svg
          viewBox="0 0 340 70"
          className="w-[280px] md:w-[320px] h-[55px] overflow-visible"
        >
          <path
            id="clubCurve"
            d="M 20 62 Q 170 12 320 62"
            fill="transparent"
            stroke="transparent"
          />
          <text className="font-editorial text-[11px] md:text-[12px] font-bold tracking-[0.26em] fill-neutral-300 uppercase">
            <textPath href="#clubCurve" startOffset="50%" textAnchor="middle">
              {displayedMember.handle.replace('@', '')}&apos;S BUILDER CLUB
            </textPath>
          </text>
        </svg>
      </div>

      {/* Row of Vertical Pill/Squircle Avatars */}
      <div className="flex items-center justify-center gap-3 md:gap-4 py-2 px-3">
        {members.map((member) => {
          const isSelected = activeMember.id === member.id;
          const isHovered = hoveredMember?.id === member.id;
          const isAnyHovered = hoveredMember !== null;
          const isDimmed = isAnyHovered && !isHovered;

          return (
            <motion.div
              key={member.id}
              className="relative cursor-pointer group flex flex-col items-center"
              onMouseEnter={() => setHoveredMember(member)}
              onMouseLeave={() => setHoveredMember(null)}
              onClick={() => switchMember(member.id)}
              animate={{
                scale: isHovered ? 1.14 : isSelected ? 1.05 : 1,
                y: isHovered ? -8 : isSelected ? -2 : 0,
                opacity: isDimmed ? 0.38 : 1,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 25 }}
            >
              {/* Score pill badge appearing above portrait on hover */}
              <AnimatePresence>
                {(isHovered || isSelected) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.8 }}
                    animate={{ opacity: 1, y: -6, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                    className="absolute -top-7 z-20 px-2 py-0.5 rounded-full bg-surface-elevated border border-hairline-bright shadow-lg"
                  >
                    <span className="font-editorial text-[10px] tracking-wider font-bold text-studio-olive">
                      {member.avgScore}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Central vertical pill-shaped portrait avatar */}
              <div
                className={`relative w-[60px] h-[80px] md:w-[68px] md:h-[88px] rounded-full overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.18)]'
                    : 'border border-white/20 hover:border-white/60'
                }`}
                style={{
                  boxShadow: isSelected
                    ? 'inset 0 1px 3px rgba(255,255,255,0.5), 0 8px 18px rgba(0,0,0,0.8)'
                    : 'inset 0 1px 2px rgba(255,255,255,0.2), 0 4px 10px rgba(0,0,0,0.6)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Sub-handle indicator */}
              <span className="mt-2 font-editorial text-[9px] md:text-[10px] tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                {member.handle}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Staggered Split-Character Vertical Roll Reveal in Antonio Typography */}
      <div className="mt-4 flex flex-col items-center">
        <div className="h-[46px] md:h-[54px] overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayedMember.id}
              className="flex items-center space-x-1"
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {memberNameChars.map((char, index) => (
                <motion.span
                  key={`${displayedMember.id}-${index}`}
                  className="font-scoreboard text-[38px] md:text-[50px] font-bold tracking-tight text-white inline-block"
                  variants={{
                    initial: { y: '100%', opacity: 0, rotateX: -60 },
                    animate: {
                      y: '0%',
                      opacity: 1,
                      rotateX: 0,
                      transition: {
                        duration: 0.38,
                        delay: index * 0.022,
                        ease: [0.215, 0.61, 0.355, 1],
                      },
                    },
                    exit: {
                      y: '-100%',
                      opacity: 0,
                      rotateX: 60,
                      transition: {
                        duration: 0.22,
                        delay: index * 0.012,
                        ease: [0.55, 0.055, 0.675, 0.19],
                      },
                    },
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Builder Role & Sub-Telemetry */}
        <p className="font-editorial text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-neutral-400">
          {displayedMember.role}
        </p>
      </div>
    </div>
  );
};

