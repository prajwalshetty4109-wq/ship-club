import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useClub } from '@/lib/ClubContext';
import {
  Compass,
  User,
  PlusCircle,
  Target,
  Settings,
  ShieldAlert,
  Flame,
  Award,
  Lock,
} from 'lucide-react';
import { PillBadge3D } from './PillBadge3D';

interface LayoutProps {
  children: React.ReactNode;
  showRightPanel?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showRightPanel = true }) => {
  const router = useRouter();
  const {
    activeMember,
    studioTheme,
    switchTheme,
    badges,
    openInspector,
    repos,
  } = useClub();

  const getVignetteClass = () => {
    switch (studioTheme) {
      case 'olive':
        return 'bg-[radial-gradient(ellipse_at_top,_#1C3015_0%,_#0D170A_45%,_#000000_80%)]';
      case 'amber':
        return 'bg-[radial-gradient(ellipse_at_top,_#3D2607_0%,_#1F1303_45%,_#000000_80%)]';
      case 'monochrome':
        return 'bg-[radial-gradient(ellipse_at_top,_#262626_0%,_#141414_45%,_#000000_80%)]';
      case 'brick':
      default:
        return 'bg-[radial-gradient(ellipse_at_top,_#6B1414_0%,_#2A0707_45%,_#000000_80%)]';
    }
  };

  const navItems = [
    { label: 'Your Club', href: '/', icon: Compass },
    { label: 'You', href: '/you', icon: User },
    { label: '+ Scan', href: '/new', icon: PlusCircle, highlight: true },
    { label: 'Goals', href: '/goals', icon: Target },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="relative min-h-screen bg-oled text-white overflow-x-hidden selection:bg-studio-brick selection:text-white">
      {/* 2. Warm Studio Top Lighting Radial Vignette */}
      <div
        className={`fixed top-0 left-0 right-0 h-[480px] pointer-events-none transition-all duration-1000 z-0 opacity-80 ${getVignetteClass()}`}
      />

      {/* Structural Hairline Frame */}
      <div className="relative z-10 flex min-h-screen max-w-7xl mx-auto">
        {/* DESKTOP LEFT SIDEBAR: Navigation & Quick Account/Theme Switcher (>= 768px) */}
        <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 shrink-0 border-r border-hairline bg-surface/50 backdrop-blur-xl p-6 sticky top-0 h-screen">
          <div>
            {/* Club Brand */}
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-10 h-10 rounded-2xl bg-surface-elevated border border-hairline group-hover:border-white/50 flex items-center justify-center transition-all shadow-inner">
                <ShieldAlert className="w-5 h-5 text-studio-brick group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="font-scoreboard text-2xl font-bold tracking-tight uppercase leading-none block">
                  SHIP CLUB
                </span>
                <span className="font-editorial text-[9px] tracking-[0.25em] uppercase text-neutral-400 block mt-0.5">
                  AUDITOR & README STUDIO
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="space-y-1.5 font-editorial text-xs uppercase tracking-wider">
              {navItems.map((item) => {
                const isActive = router.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${
                      item.highlight
                        ? 'bg-studio-brick hover:bg-studio-brick/80 text-white font-bold shadow-[0_4px_16px_rgba(107,20,20,0.5)] border border-white/20'
                        : isActive
                        ? 'bg-surface-elevated text-white font-bold border border-hairline-bright'
                        : 'text-neutral-400 hover:text-white hover:bg-surface-elevated/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Quick Studio Lighting Theme Switcher */}
            <div className="mt-8 pt-6 border-t border-hairline">
              <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-3">
                STUDIO LIGHTING
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'brick', name: 'Brick Crimson', color: '#6B1414' },
                  { id: 'olive', name: 'Forest Olive', color: '#1C3015' },
                  { id: 'amber', name: 'Warm Amber', color: '#3D2607' },
                  { id: 'monochrome', name: 'Monochrome', color: '#262626' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => switchTheme(th.id as any)}
                    className={`h-7 rounded-xl border flex items-center justify-center transition-all ${
                      studioTheme === th.id
                        ? 'border-white scale-105 shadow-md'
                        : 'border-hairline hover:border-neutral-500 opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: th.color }}
                    title={th.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Active Profile Snapshot Card */}
          <div className="p-3.5 rounded-2xl bg-surface-elevated border border-hairline flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeMember.avatarUrl}
                alt={activeMember.name}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div className="leading-tight">
                <span className="font-editorial text-xs font-bold text-white block">
                  {activeMember.name}
                </span>
                <span className="font-editorial text-[10px] text-neutral-400 block">
                  {activeMember.handle}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-scoreboard text-xl font-bold text-studio-olive block">
                {activeMember.avgScore}%
              </span>
              <span className="font-editorial text-[8px] text-neutral-500 uppercase tracking-widest block">
                SCORE
              </span>
            </div>
          </div>
        </aside>

        {/* CENTER CONTENT COLUMN */}
        <main className="flex-1 min-w-0 pb-28 md:pb-12">
          {children}
        </main>

        {/* DESKTOP RIGHT SIDEBAR (Live Repo Inspector, API Security Verifier & 3D Badge Vault) */}
        {showRightPanel && (
          <aside className="hidden xl:flex flex-col w-80 lg:w-88 shrink-0 border-l border-hairline bg-surface/30 backdrop-blur-xl p-6 sticky top-0 h-screen overflow-y-auto space-y-6">
            {/* Top Security Status Pill */}
            <div className="p-4 rounded-2xl bg-surface border border-hairline flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-studio-olive animate-pulse" />
                <span className="font-editorial text-[11px] font-bold uppercase tracking-wider text-white">
                  SERVER SECRETS SECURED
                </span>
              </div>
              <Lock size={14} className="text-studio-olive" />
            </div>

            {/* 3D Trophy Vault Preview */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-editorial text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 flex items-center space-x-1.5">
                  <Award size={14} />
                  <span>3D TROPHY VAULT</span>
                </span>
                <Link
                  href="/you"
                  className="font-editorial text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider"
                >
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {badges.slice(0, 6).map((badge) => (
                  <div key={badge.id} className="flex justify-center">
                    <PillBadge3D badge={badge} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Inspect Latest Repos */}
            <div>
              <span className="font-editorial text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3 flex items-center space-x-1.5">
                <Flame size={14} />
                <span>QUICK INSPECT</span>
              </span>

              <div className="space-y-2.5">
                {repos.slice(0, 3).map((repo) => (
                  <button
                    key={repo.id}
                    onClick={() => openInspector(repo)}
                    className="w-full text-left p-3 rounded-xl bg-surface border border-hairline hover:border-hairline-bright transition-all group flex items-center justify-between"
                  >
                    <div>
                      <span className="font-editorial text-xs font-bold text-white group-hover:text-neutral-100 block">
                        {repo.name}
                      </span>
                      <span className="font-editorial text-[10px] text-neutral-400 block">
                        {repo.filesScanned} files · {repo.language}
                      </span>
                    </div>

                    <span className="font-stamp text-xs font-bold text-studio-olive">
                      {repo.securityScore}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Server-Side Isolation Guarantee */}
            <div className="p-4 rounded-2xl bg-surface-subtle border border-hairline text-neutral-400 font-editorial text-[10px] leading-relaxed">
              <span className="text-white font-bold block mb-1">
                Zero Client Token Exposure
              </span>
              Ship Club isolates all Gemini and Supabase service role keys to server-side Next.js route handlers. In-memory sliding rate limiting protects against API flood attacks.
            </div>
          </aside>
        )}
      </div>

      {/* MOBILE FIXED BOTTOM DOCK (< 768px) — Any Distance Mobile Frame */}
      <nav className="md:hidden fixed bottom-4 inset-x-4 h-16 bg-[#111111]/90 backdrop-blur-2xl border border-hairline rounded-3xl z-40 flex items-center justify-around px-2 shadow-[0_12px_36px_rgba(0,0,0,0.85)]">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                item.highlight
                  ? 'bg-studio-brick text-white p-2.5 rounded-full shadow-lg border border-white/20'
                  : isActive
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Icon size={item.highlight ? 20 : 18} />
              {!item.highlight && (
                <span className="font-editorial text-[9px] tracking-wider uppercase mt-1">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

