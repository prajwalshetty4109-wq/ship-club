import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface Skiper19SvgScrollProps {
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
}

/**
 * Skiper UI Component #19: SVG Follow Scroll Path
 * Native Framer Motion implementation with zero-error self-containment.
 * Animates a sweeping curved SVG track down the feed with spring smoothing
 * in warm Terracotta Crimson (#991B1B) over a dashed #1F1F1F technical track line.
 */
export const Skiper19SvgScroll: React.FC<Skiper19SvgScrollProps> = ({
  containerRef,
  className = '',
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // SVG curved path spanning the vertical telemetry track
  const pathD =
    'M 24,10 C 24,180 84,260 84,420 C 84,580 18,660 18,840 C 18,1020 80,1120 80,1320 C 80,1520 22,1640 22,1880 C 22,2120 82,2240 82,2520';

  return (
    <div
      className={`absolute inset-y-0 left-0 w-24 pointer-events-none hidden lg:block overflow-visible ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 100 2600"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Dashed #1F1F1F technical track line */}
        <path
          d={pathD}
          stroke="#1F1F1F"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />

        {/* Dynamic Sweeping Terracotta Crimson (#991B1B) Follow Scroll Path */}
        <motion.path
          d={pathD}
          stroke="#991B1B"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
        />

        {/* Small technical milestone nodes along the track */}
        <circle cx="24" cy="10" r="3" fill="#E5E5E5" />
        <circle cx="84" cy="420" r="2.5" fill="#6B1414" />
        <circle cx="18" cy="840" r="2.5" fill="#6B1414" />
        <circle cx="80" cy="1320" r="2.5" fill="#6B1414" />
        <circle cx="22" cy="1880" r="2.5" fill="#6B1414" />
      </svg>
    </div>
  );
};

