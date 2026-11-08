import React from 'react';
import { Layout } from '@/components/Layout';
import { useClub } from '@/lib/ClubContext';
import { PillBadge3D } from '@/components/PillBadge3D';
import {
  Award,
  Calendar,
  ShieldCheck,
  Zap,
  GitCommit,
  CheckCircle2,
} from 'lucide-react';

export default function ProfileVaultPage() {
  const { activeMember, badges, repos, openInspector } = useClub();

  // Generate 28-day contribution activity streak matrix
  const streakDays = Array.from({ length: 35 }, (_, i) => {
    const day = i + 1;
    const isAuditedDay = [1, 2, 4, 5, 8, 9, 11, 12, 14, 15, 18, 19, 21, 22, 25, 26, 28, 29, 31, 32].includes(day);
    return {
      day,
      audited: isAuditedDay,
      count: isAuditedDay ? ((day % 4) + 1) : 0,
    };
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 md:pt-14 space-y-12">
        {/* Profile Card Header */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface border border-hairline shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative w-20 h-28 md:w-24 md:h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeMember.avatarUrl}
                alt={activeMember.name}
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-editorial text-[10px] uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-studio-brick/80 text-white border border-white/20">
                  {activeMember.role}
                </span>
              </div>
              <h1 className="font-scoreboard text-4xl md:text-5xl font-bold uppercase text-white tracking-tight mt-1">
                {activeMember.name}
              </h1>
              <p className="font-editorial text-xs text-neutral-400 mt-1">
                {activeMember.handle} · Member since Oct 2024
              </p>
              <p className="font-editorial text-xs text-neutral-300 mt-3 max-w-md leading-relaxed">
                {activeMember.bio}
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-hairline">
            <div className="text-left md:text-right">
              <span className="font-editorial text-[10px] tracking-widest uppercase text-neutral-500 block">
                REPUTATION
              </span>
              <span className="font-scoreboard text-4xl font-bold text-studio-olive block leading-none mt-1">
                {activeMember.avgScore}%
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-surface-elevated px-3 py-1.5 rounded-full border border-hairline">
              <Zap size={14} className="text-studio-amber" />
              <span className="font-editorial text-xs text-white font-bold">
                {activeMember.streakDays} Day Streak
              </span>
            </div>
          </div>
        </div>

        {/* Lifetime Audit Scoreboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-surface border border-hairline">
            <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-1">
              REPOS AUDITED
            </span>
            <span className="font-scoreboard text-4xl font-bold text-white tabular-nums">
              {activeMember.reposAudited}
            </span>
            <span className="font-editorial text-[9px] text-neutral-500 uppercase tracking-wider block mt-1">
              Passed 12-pt check
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-hairline">
            <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-1">
              LEAKS FOUND
            </span>
            <span className="font-scoreboard text-4xl font-bold text-studio-olive tabular-nums">
              {activeMember.leaksFound}
            </span>
            <span className="font-editorial text-[9px] text-studio-olive uppercase tracking-wider block mt-1">
              Zero Key Exposure
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-hairline">
            <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-1">
              MEDALS EARNED
            </span>
            <span className="font-scoreboard text-4xl font-bold text-white tabular-nums">
              {activeMember.medalsEarned}
            </span>
            <span className="font-editorial text-[9px] text-neutral-500 uppercase tracking-wider block mt-1">
              In 3D Trophy Vault
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-hairline">
            <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-neutral-400 block mb-1">
              CODE RANK
            </span>
            <span className="font-scoreboard text-4xl font-bold text-white tabular-nums">
              #01
            </span>
            <span className="font-editorial text-[9px] text-studio-olive uppercase tracking-wider block mt-1">
              Principal Architect
            </span>
          </div>
        </div>

        {/* 3D Trophy Vault Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Award size={18} className="text-studio-brick" />
                <h2 className="font-scoreboard text-3xl font-bold uppercase text-white tracking-tight">
                  3D TROPHY VAULT
                </h2>
              </div>
              <p className="font-editorial text-[11px] text-neutral-400">
                Collectible capsule-shaped 3D pill badges unlocked through automated inspections.
              </p>
            </div>
            <span className="font-editorial text-xs text-studio-olive font-bold">
              {badges.length} Medals Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-surface border border-hairline">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center p-3 rounded-2xl bg-surface-elevated/40 border border-hairline hover:border-hairline-bright transition-all group"
              >
                <div className="py-2">
                  <PillBadge3D badge={badge} />
                </div>
                <span className="font-editorial text-xs font-bold text-white mt-2">
                  {badge.title}
                </span>
                <span className="font-editorial text-[10px] text-neutral-400 text-center line-clamp-2 mt-1">
                  {badge.description}
                </span>
                <span className="mt-2 font-editorial text-[9px] uppercase tracking-widest text-studio-olive flex items-center space-x-1">
                  <CheckCircle2 size={10} />
                  <span>{badge.unlockedAt}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Activity Streak Matrix */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface border border-hairline space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-neutral-400" />
                <h3 className="font-editorial text-xs font-bold uppercase tracking-wider text-white">
                  35-Day Audit & Hardening Matrix
                </h3>
              </div>
              <p className="font-editorial text-[11px] text-neutral-400 mt-1">
                Visual log of automated audits, pull request reviews, and security patches.
              </p>
            </div>
            <span className="font-editorial text-xs text-studio-amber font-bold">
              {activeMember.streakDays} Consecutive Days
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {streakDays.map((d) => (
              <div
                key={d.day}
                className={`h-9 rounded-xl border flex items-center justify-center font-editorial text-[10px] transition-all ${
                  d.audited
                    ? 'bg-studio-brick/80 border-studio-brick text-white shadow-sm font-bold'
                    : 'bg-surface-elevated border-hairline text-neutral-600'
                }`}
                title={`Day ${d.day}: ${d.count} audits completed`}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>

        {/* Repositories Managed by User */}
        <div className="space-y-4">
          <h3 className="font-scoreboard text-2xl font-bold uppercase text-white">
            REPOSITORIES CERTIFIED BY YOU
          </h3>
          <div className="space-y-3">
            {repos.map((repo) => (
              <div
                key={repo.id}
                onClick={() => openInspector(repo)}
                className="p-4 rounded-2xl bg-surface border border-hairline hover:border-hairline-bright cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <GitCommit size={18} className="text-neutral-400 group-hover:text-white transition-colors" />
                  <div>
                    <span className="font-editorial text-xs font-bold text-white group-hover:text-neutral-200">
                      {repo.fullName}
                    </span>
                    <span className="font-editorial text-[10px] text-neutral-400 block">
                      {repo.architectureType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="font-editorial text-[10px] tracking-wider uppercase text-neutral-500">
                    {repo.scannedAt}
                  </span>
                  <span className="font-stamp text-xs font-bold text-studio-olive px-2 py-0.5 rounded bg-surface-elevated border border-hairline">
                    {repo.securityScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

