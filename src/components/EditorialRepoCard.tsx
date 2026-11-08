import React from 'react';
import { motion } from 'framer-motion';
import { AuditedRepository } from '@/lib/types';
import { PillBadge3D } from './PillBadge3D';
import { GitBranch, Star, GitFork, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface EditorialRepoCardProps {
  repo: AuditedRepository;
  onClick: () => void;
  className?: string;
}

export const EditorialRepoCard: React.FC<EditorialRepoCardProps> = ({
  repo,
  onClick,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={onClick}
      className={`relative w-full rounded-3xl overflow-hidden border border-hairline bg-surface cursor-pointer select-none group shadow-2xl ${className}`}
      style={{
        minHeight: '340px',
      }}
    >
      {/* Background High-Resolution Documentary/Workspace Unsplash Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={repo.photoUrl}
        alt={repo.photoAlt || repo.name}
        className="absolute inset-0 w-full h-full object-cover grayscale-[35%] contrast-110 brightness-[0.8] group-hover:scale-105 group-hover:brightness-[0.88] transition-all duration-700 ease-out"
      />

      {/* Natural Dark Studio Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/55 pointer-events-none" />

      {/* Structural Hairline Inner Border */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none group-hover:border-white/25 transition-colors" />

      {/* Card Content Layout */}
      <div className="relative h-full flex flex-col justify-between p-5 md:p-7 z-10">
        {/* Top Header: White Git vector icon + Wide Syne score stamp */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <svg
              className="w-4 h-4 text-white fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="font-stamp text-[13px] md:text-[15px] font-extrabold tracking-wider text-white">
              {repo.securityScore}/100
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-editorial text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-neutral-300 bg-black/50 px-2.5 py-1 rounded-full border border-hairline">
              {repo.scannedAt}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>

        {/* Middle: Bold Repo Title + Subtitle / Telemetry */}
        <div className="my-6">
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="font-editorial text-[11px] tracking-wider text-neutral-400">
              {repo.owner} /
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-editorial bg-studio-brick/80 text-white/90 border border-white/10 uppercase tracking-widest">
              {repo.language}
            </span>
          </div>

          <h3 className="font-scoreboard text-[32px] md:text-[40px] font-bold text-white leading-tight tracking-tight uppercase group-hover:text-neutral-100 transition-colors">
            {repo.name}
          </h3>

          <p className="font-editorial text-[12px] md:text-[13px] text-neutral-300/90 line-clamp-2 max-w-xl mt-2 leading-relaxed">
            {repo.auditSummary}
          </p>

          {/* Telemetry pill chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-hairline text-neutral-300 font-editorial text-[10px]">
              <GitBranch size={12} className="text-neutral-400" />
              <span>{repo.filesScanned} FILES READ</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-hairline text-neutral-300 font-editorial text-[10px]">
              <ShieldCheck size={12} className={repo.leaksFound === 0 ? 'text-studio-olive' : 'text-studio-crimson'} />
              <span>{repo.leaksFound === 0 ? 'ZERO LEAKS' : `${repo.leaksFound} LEAKS`}</span>
            </div>
            {repo.starsCount > 0 && (
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-hairline text-neutral-400 font-editorial text-[10px]">
                <Star size={11} />
                <span>{repo.starsCount.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Architecture label and Bottom-Right Overlapping Stack of 3 Miniature 3D Capsule Pills */}
        <div className="flex items-end justify-between pt-3 border-t border-white/10">
          <div className="flex flex-col">
            <span className="font-editorial text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
              ARCHITECTURE TYPE
            </span>
            <span className="font-editorial text-[11px] text-neutral-200 font-medium">
              {repo.architectureType}
            </span>
          </div>

          {/* Overlapping stack of 3 earned miniature 3D capsule pills */}
          <div className="flex items-center -space-x-2">
            {repo.badges.slice(0, 3).map((badge, idx) => (
              <div
                key={`${repo.id}-${badge.id}-${idx}`}
                className="transform transition-transform hover:translate-y-[-4px] hover:z-20"
                style={{ zIndex: 10 - idx }}
              >
                <PillBadge3D badge={badge} size="mini" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

