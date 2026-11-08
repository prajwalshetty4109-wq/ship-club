import React, { useRef, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useClub } from '@/lib/ClubContext';
import { Skiper6HoverMembers } from '@/components/Skiper6HoverMembers';
import { Skiper19SvgScroll } from '@/components/Skiper19SvgScroll';
import { PillBadge3D } from '@/components/PillBadge3D';
import { BadgeModal } from '@/components/BadgeModal';
import { EditorialRepoCard } from '@/components/EditorialRepoCard';
import { RepoInspectorDrawer } from '@/components/RepoInspectorDrawer';
import { INITIAL_MEMBERS } from '@/lib/clubStore';
import { PillBadge } from '@/lib/types';
import Link from 'next/link';
import { Plus, ShieldCheck, Flame, Filter } from 'lucide-react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBadge, setSelectedBadge] = useState<PillBadge | null>(null);
  const [feedFilter, setFeedFilter] = useState<'ALL' | 'ZERO_LEAKS' | 'HIGH_SCORE'>('ALL');

  const {
    activeMember,
    repos,
    badges,
    inspectedRepo,
    drawerOpen,
    inspectorTab,
    openInspector,
    closeInspector,
    setInspectorTab,
  } = useClub();

  const filteredRepos = repos.filter((repo) => {
    if (feedFilter === 'ZERO_LEAKS') return repo.leaksFound === 0;
    if (feedFilter === 'HIGH_SCORE') return repo.securityScore >= 96;
    return true;
  });

  return (
    <Layout>
      <div ref={containerRef} className="relative min-h-screen px-4 md:px-8 pt-6 md:pt-10">
        {/* Skiper19 Scroll-Driven SVG Telemetry Path */}
        <Skiper19SvgScroll containerRef={containerRef} />

        {/* 1. Skiper6 Hover Builders Roster + Curved SVG Arch Club Header */}
        <section className="mb-10">
          <Skiper6HoverMembers members={INITIAL_MEMBERS} />
        </section>

        {/* 2. Four-Column Antonio Scoreboard Numerals */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8 rounded-3xl bg-surface border border-hairline shadow-2xl">
            {/* Column 1: AVG SCORE */}
            <div className="flex flex-col">
              <span className="font-editorial text-[11px] tracking-[0.2em] uppercase text-neutral-300 mb-2">
                AVG SCORE
              </span>
              <div className="flex items-baseline space-x-1">
                <span className="font-scoreboard text-[64px] md:text-[74px] font-bold tracking-tighter leading-[0.86] text-white tabular-nums">
                  {activeMember.avgScore}
                </span>
                <span className="font-scoreboard text-2xl text-neutral-500 font-bold">%</span>
              </div>
              <span className="font-editorial text-[9px] text-studio-olive uppercase tracking-widest mt-2 flex items-center space-x-1">
                <ShieldCheck size={11} />
                <span>Zero Leaks Grade</span>
              </span>
            </div>

            {/* Column 2: FILES READ */}
            <div className="flex flex-col border-l border-hairline/60 pl-4 md:pl-6">
              <span className="font-editorial text-[11px] tracking-[0.2em] uppercase text-neutral-300 mb-2">
                FILES READ
              </span>
              <span className="font-scoreboard text-[64px] md:text-[74px] font-bold tracking-tighter leading-[0.86] text-white tabular-nums">
                {activeMember.reposAudited}
              </span>
              <span className="font-editorial text-[9px] text-neutral-400 uppercase tracking-widest mt-2">
                Parsed This Cohort
              </span>
            </div>

            {/* Column 3: LEAKS FOUND */}
            <div className="flex flex-col border-l border-hairline/60 pl-4 md:pl-6">
              <span className="font-editorial text-[11px] tracking-[0.2em] uppercase text-neutral-300 mb-2">
                LEAKS FOUND
              </span>
              <span className="font-scoreboard text-[64px] md:text-[74px] font-bold tracking-tighter leading-[0.86] text-studio-olive tabular-nums">
                {activeMember.leaksFound}
              </span>
              <span className="font-editorial text-[9px] text-studio-olive uppercase tracking-widest mt-2">
                Credentials Sealed
              </span>
            </div>

            {/* Column 4: MEDALS */}
            <div className="flex flex-col border-l border-hairline/60 pl-4 md:pl-6">
              <span className="font-editorial text-[11px] tracking-[0.2em] uppercase text-neutral-300 mb-2">
                MEDALS
              </span>
              <span className="font-scoreboard text-[64px] md:text-[74px] font-bold tracking-tighter leading-[0.86] text-white tabular-nums">
                {activeMember.medalsEarned}
              </span>
              <span className="font-editorial text-[9px] text-neutral-400 uppercase tracking-widest mt-2">
                Tactile 3D Pills
              </span>
            </div>
          </div>
        </section>

        {/* 3. Tactile 3D Collectible Pill Badges Carousel */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-scoreboard text-2xl font-bold uppercase text-white tracking-tight">
                COLLECTIBLE 3D PILL BADGES
              </h3>
              <p className="font-editorial text-[11px] text-neutral-400">
                Matte white ceramic, brushed gunmetal, raw silver, and warm chartreuse.
              </p>
            </div>

            <Link
              href="/you"
              className="font-editorial text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              Vault (7) →
            </Link>
          </div>

          <div className="flex items-center space-x-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none">
            {badges.map((badge) => (
              <PillBadge3D
                key={badge.id}
                badge={badge}
                onClick={() => setSelectedBadge(badge)}
              />
            ))}
          </div>
        </section>

        {/* 4. Real-Photo Audited Repository Feed */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <Flame size={18} className="text-studio-brick" />
                <h3 className="font-scoreboard text-3xl font-bold uppercase text-white tracking-tight">
                  AUDITED REPOSITORY FEED
                </h3>
              </div>
              <p className="font-editorial text-[11px] text-neutral-400">
                Live security audits, architecture blueprints, and AI README documentation.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {/* Feed Filters */}
              <div className="flex items-center space-x-1 p-1 bg-surface rounded-xl border border-hairline font-editorial text-[10px] uppercase">
                <button
                  type="button"
                  onClick={() => setFeedFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    feedFilter === 'ALL' ? 'bg-surface-elevated text-white font-bold' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  All ({repos.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFeedFilter('ZERO_LEAKS')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    feedFilter === 'ZERO_LEAKS' ? 'bg-surface-elevated text-white font-bold' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  Zero Leaks
                </button>
                <button
                  type="button"
                  onClick={() => setFeedFilter('HIGH_SCORE')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    feedFilter === 'HIGH_SCORE' ? 'bg-surface-elevated text-white font-bold' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  Score 96+
                </button>
              </div>

              <Link
                href="/new"
                className="px-4 py-2 rounded-2xl bg-white text-black font-editorial text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center space-x-2 shadow-lg shrink-0"
              >
                <Plus size={16} />
                <span>+ Audit</span>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {filteredRepos.map((repo) => (
              <EditorialRepoCard
                key={repo.id}
                repo={repo}
                onClick={() => openInspector(repo)}
              />
            ))}
          </div>
        </section>

        {/* 5. 3D Pill Badge Inspection Modal */}
        <BadgeModal
          badge={selectedBadge}
          isOpen={selectedBadge !== null}
          onClose={() => setSelectedBadge(null)}
        />

        {/* 6. Editorial Repo Inspector Drawer */}
        <RepoInspectorDrawer
          repo={inspectedRepo}
          isOpen={drawerOpen}
          activeTab={inspectorTab}
          onTabChange={setInspectorTab}
          onClose={closeInspector}
        />
      </div>
    </Layout>
  );
}

