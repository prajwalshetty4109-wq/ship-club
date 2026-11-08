import React from 'react';
import { motion } from 'framer-motion';
import { BadgeMaterial, PillBadge } from '@/lib/types';
import { ShieldCheck, FileText, Code2, Lock, Scale, Flame, Award } from 'lucide-react';

interface PillBadge3DProps {
  badge: PillBadge;
  size?: 'normal' | 'mini';
  onClick?: () => void;
  className?: string;
}

export const PillBadge3D: React.FC<PillBadge3DProps> = ({
  badge,
  size = 'normal',
  onClick,
  className = '',
}) => {
  const getIcon = (name: string, iconSize: number) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck size={iconSize} />;
      case 'FileText':
        return <FileText size={iconSize} />;
      case 'Code2':
        return <Code2 size={iconSize} />;
      case 'Lock':
        return <Lock size={iconSize} />;
      case 'Scale':
        return <Scale size={iconSize} />;
      case 'Flame':
        return <Flame size={iconSize} />;
      case 'Award':
      default:
        return <Award size={iconSize} />;
    }
  };

  const getMaterialStyles = (material: BadgeMaterial) => {
    switch (material) {
      case 'ceramic':
        return {
          background: 'linear-gradient(180deg, #F5F5F5 0%, #E5E5E5 55%, #D4D4D4 100%)',
          textColor: 'text-neutral-900',
          subtextColor: 'text-neutral-600',
          shadow:
            'inset 0 2px 5px rgba(255,255,255,0.95), inset 0 -6px 10px rgba(0,0,0,0.85), 0 12px 24px rgba(0,0,0,0.75)',
          border: '1px solid rgba(255,255,255,0.4)',
        };
      case 'gunmetal':
        return {
          background: 'linear-gradient(180deg, #333333 0%, #262626 55%, #181818 100%)',
          textColor: 'text-neutral-100',
          subtextColor: 'text-neutral-400',
          shadow:
            'inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -6px 10px rgba(0,0,0,0.95), 0 12px 24px rgba(0,0,0,0.85)',
          border: '1px solid rgba(255,255,255,0.12)',
        };
      case 'silver':
        return {
          background: 'linear-gradient(180deg, #D4D4D4 0%, #A3A3A3 55%, #737373 100%)',
          textColor: 'text-neutral-900',
          subtextColor: 'text-neutral-800',
          shadow:
            'inset 0 2px 5px rgba(255,255,255,0.75), inset 0 -6px 10px rgba(0,0,0,0.85), 0 12px 24px rgba(0,0,0,0.75)',
          border: '1px solid rgba(255,255,255,0.3)',
        };
      case 'chartreuse':
        return {
          background: 'linear-gradient(180deg, #BEF264 0%, #A3E635 55%, #65A30D 100%)',
          textColor: 'text-neutral-950',
          subtextColor: 'text-neutral-800',
          shadow:
            'inset 0 2px 5px rgba(255,255,255,0.85), inset 0 -6px 10px rgba(0,0,0,0.85), 0 12px 24px rgba(0,0,0,0.75)',
          border: '1px solid rgba(255,255,255,0.5)',
        };
    }
  };

  const mat = getMaterialStyles(badge.material);

  if (size === 'mini') {
    return (
      <div
        className={`relative w-[28px] h-[48px] rounded-full flex flex-col items-center justify-center select-none ${className}`}
        style={{
          background: mat.background,
          boxShadow:
            'inset 0 1px 3px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.6)',
          border: mat.border,
        }}
        title={`${badge.title} (${badge.material})`}
      >
        <div className={mat.textColor}>{getIcon(badge.iconName, 12)}</div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`relative w-[72px] h-[112px] rounded-full flex flex-col items-center justify-between py-3.5 px-1 cursor-pointer select-none group ${className}`}
      style={{
        background: mat.background,
        boxShadow: mat.shadow,
        border: mat.border,
      }}
      title={badge.description}
    >
      {/* Specular highlight rim */}
      <div className="absolute inset-x-2 top-1 h-[2px] bg-white/40 rounded-full pointer-events-none" />

      {/* Top micro-type */}
      <span
        className={`font-editorial text-[8px] font-bold tracking-[0.2em] uppercase ${mat.subtextColor}`}
      >
        {badge.subtitle}
      </span>

      {/* Center Icon */}
      <div className={`${mat.textColor} transform group-hover:scale-110 transition-transform`}>
        {getIcon(badge.iconName, 22)}
      </div>

      {/* Bottom Engraved Micro-Title */}
      <div className="flex flex-col items-center leading-none">
        <span
          className={`font-editorial text-[8px] font-extrabold tracking-tight uppercase text-center ${mat.textColor}`}
          style={{ textShadow: '0 1px 1px rgba(0,0,0,0.15)' }}
        >
          {badge.title}
        </span>
      </div>

      {/* Tactile Ambient Shadow Ring */}
      <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/25" />
    </motion.div>
  );
};

