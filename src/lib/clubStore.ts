import { useState, useEffect } from 'react';
import {
  AuditedRepository,
  BuilderMember,
  PillBadge,
  SecurityAuditLog,
  StudioTheme,
} from './types';

export const INITIAL_MEMBERS: BuilderMember[] = [
  {
    id: 'vishwas',
    handle: '@vishwas',
    name: 'Vishwas Narayan',
    role: 'CLUB FOUNDER & PRINCIPAL ARCHITECT',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    avgScore: 98,
    reposAudited: 142,
    leaksFound: 0,
    medalsEarned: 16,
    streakDays: 42,
    bio: 'Systems purist. Building zero-leak distributed architectures and hyper-tactile iOS interfaces.',
  },
  {
    id: 'johnsmith',
    handle: '@johnsmith',
    name: 'John Smith',
    role: 'LEAD INFRASTRUCTURE AUDITOR',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    avgScore: 94,
    reposAudited: 88,
    leaksFound: 2,
    medalsEarned: 11,
    streakDays: 19,
    bio: 'Kubernetes hardening, secrets rotation, and Rust micro-services.',
  },
  {
    id: 'lynetteyap',
    handle: '@lynetteyap',
    name: 'Lynette Yap',
    role: 'STAFF SECURITY RESEARCHER',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    avgScore: 97,
    reposAudited: 116,
    leaksFound: 0,
    medalsEarned: 14,
    streakDays: 31,
    bio: 'Zero-trust auth flow designer and Next.js server actions inspector.',
  },
  {
    id: 'alex_kern',
    handle: '@alex_kern',
    name: 'Alex Kern',
    role: 'CORE PLATFORM ENGINEER',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    avgScore: 91,
    reposAudited: 64,
    leaksFound: 5,
    medalsEarned: 8,
    streakDays: 14,
    bio: 'PostgreSQL connection pooling & edge CDN security headers.',
  },
  {
    id: 'sara_dev',
    handle: '@sara_dev',
    name: 'Sara Chen',
    role: 'DEVSECOPS SPECIALIST',
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    avgScore: 95,
    reposAudited: 104,
    leaksFound: 1,
    medalsEarned: 13,
    streakDays: 27,
    bio: 'Static analysis enforcement and SBOM cryptographic verification.',
  },
];

export const INITIAL_BADGES: PillBadge[] = [
  {
    id: 'badge-zero-leaks',
    title: 'ZERO LEAKS',
    subtitle: 'SECURE',
    material: 'ceramic',
    unlocked: true,
    unlockedAt: 'Today',
    description: 'No .env files, private keys, or raw bearer tokens committed to Git history.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'badge-pro-readme',
    title: 'PRO README',
    subtitle: 'STUDIO',
    material: 'silver',
    unlocked: true,
    unlockedAt: 'Yesterday',
    description: 'Autonomous documentation with architecture diagrams and reproducible setups.',
    iconName: 'FileText',
  },
  {
    id: 'badge-ts-strict',
    title: 'TS STRICT',
    subtitle: 'ZERO ANY',
    material: 'gunmetal',
    unlocked: true,
    unlockedAt: '3 days ago',
    description: 'TypeScript configuration strictly enforces noImplicitAny and strictNullChecks.',
    iconName: 'Code2',
  },
  {
    id: 'badge-clean-env',
    title: 'CLEAN ENV',
    subtitle: 'HARDENED',
    material: 'chartreuse',
    unlocked: true,
    unlockedAt: '4 days ago',
    description: 'Production secrets isolated to server-side APIs with sanitization gates.',
    iconName: 'Lock',
  },
  {
    id: 'badge-mit-license',
    title: 'MIT LICENSE',
    subtitle: 'VERIFIED',
    material: 'ceramic',
    unlocked: true,
    unlockedAt: '5 days ago',
    description: 'Standardized open source licensing recognized by GitHub Open Source API.',
    iconName: 'Scale',
  },
  {
    id: 'badge-100-audit',
    title: '100 AUDIT',
    subtitle: 'CENTURY',
    material: 'gunmetal',
    unlocked: true,
    unlockedAt: 'Last week',
    description: 'Completed 100+ automated repository inspections without a single false positive.',
    iconName: 'Flame',
  },
  {
    id: 'badge-founding-auditor',
    title: 'FOUNDING',
    subtitle: 'AUDITOR',
    material: 'ceramic',
    unlocked: true,
    unlockedAt: 'Charter Member',
    description: 'Founding member medal awarded for joining Ship Club genesis cohort.',
    iconName: 'Award',
  },
];

export const INITIAL_REPOS: AuditedRepository[] = [
  {
    id: 'repo-ship-club-core',
    owner: 'vishwas-narayan',
    name: 'ship-club-engine',
    fullName: 'vishwas-narayan/ship-club-engine',
    repoUrl: 'https://github.com/vishwas-narayan/ship-club-engine',
    branch: 'main',
    securityScore: 98,
    filesScanned: 42,
    leaksFound: 0,
    language: 'TypeScript',
    starsCount: 384,
    forksCount: 47,
    photoUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    photoAlt: 'Minimalist warm sunlit architectural space with brushed concrete',
    auditSummary:
      'Flawless zero-leak architecture. All API credentials strictly sandboxed inside Next.js server handlers. In-memory sliding rate limiting active.',
    architectureType: 'Edge Next.js + Serverless Supabase + Gemini 2.5',
    scannedAt: 'Today · 8:32 AM',
    checklist: [
      {
        id: 'chk-gitignore',
        title: '.gitignore Verification',
        description: '.env, .env.local, and node_modules explicitly excluded from git tracking.',
        passed: true,
        severity: 'CRITICAL',
        category: 'GIT_HYGIENE',
      },
      {
        id: 'chk-env-leaks',
        title: 'Environment Secrets Leak Scan',
        description: 'Zero hardcoded AWS, Supabase Service Role, or Gemini keys detected.',
        passed: true,
        severity: 'CRITICAL',
        category: 'ENV_SECRETS',
      },
      {
        id: 'chk-ts-strict',
        title: 'TypeScript strict: true',
        description: 'Compiler options enforce strictNullChecks and disallow implicit any types.',
        passed: true,
        severity: 'HIGH',
        category: 'TYPESCRIPT',
      },
      {
        id: 'chk-csp-headers',
        title: 'Security Headers & CSP',
        description: 'X-Frame-Options: DENY, X-Content-Type-Options: nosniff configured.',
        passed: true,
        severity: 'HIGH',
        category: 'HEADERS',
      },
      {
        id: 'chk-rate-limit',
        title: 'API Rate Limiting Shield',
        description: 'Sliding window limits requests to 20/min per IP to prevent DoS attacks.',
        passed: true,
        severity: 'HIGH',
        category: 'ENV_SECRETS',
      },
      {
        id: 'chk-xss-sanitize',
        title: 'XSS Input Sanitization Gate',
        description: 'Input scrubber strips scripts, malicious tags, and javascript pseudo-protocols.',
        passed: true,
        severity: 'HIGH',
        category: 'HEADERS',
      },
      {
        id: 'chk-license',
        title: 'Open Source License File',
        description: 'Valid permissive MIT license detected at root of repository.',
        passed: true,
        severity: 'MEDIUM',
        category: 'LICENSE',
      },
      {
        id: 'chk-readme',
        title: 'README.md Documentation',
        description: 'Comprehensive setup guide, architectural blueprint, and deployment matrix.',
        passed: true,
        severity: 'MEDIUM',
        category: 'CI_CD',
      },
      {
        id: 'chk-ci',
        title: 'Automated CI/CD Pipeline',
        description: 'GitHub Actions workflow checks linting, builds, and runs test suites.',
        passed: true,
        severity: 'MEDIUM',
        category: 'CI_CD',
      },
      {
        id: 'chk-rls',
        title: 'Database Row Level Security',
        description: 'Supabase tables guarded with RLS policies restricting unauthorized writes.',
        passed: true,
        severity: 'CRITICAL',
        category: 'ENV_SECRETS',
      },
      {
        id: 'chk-pwa',
        title: 'PWA Manifest & Mobile Config',
        description: 'Web manifest and Capacitor mobile wrapper configured with OLED canvas.',
        passed: true,
        severity: 'LOW',
        category: 'GIT_HYGIENE',
      },
      {
        id: 'chk-deps',
        title: 'Dependencies Vulnerability Audit',
        description: '0 critical CVE vulnerabilities found in package lock manifest.',
        passed: true,
        severity: 'HIGH',
        category: 'CI_CD',
      },
    ],
    envHardening: {
      recommendedEnv: `# SHIP CLUB — Production Hardened Environment
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
# Server-only secrets — NEVER prefix with NEXT_PUBLIC_
SUPABASE_SERVICE_ROLE_KEY=eyJh...
GEMINI_API_KEY=AIzaSy...
RATE_LIMIT_MAX_REQUESTS=20
RATE_LIMIT_WINDOW_MS=60000`,
      securityHeadersConfig: `// next.config.mjs Security Headers
export default {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
      ]
    }];
  }
};`,
      cspPolicy: `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;`,
    },
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1], INITIAL_BADGES[2]],
  },
  {
    id: 'repo-supabase-db',
    owner: 'supabase',
    name: 'supabase',
    fullName: 'supabase/supabase',
    repoUrl: 'https://github.com/supabase/supabase',
    branch: 'master',
    securityScore: 96,
    filesScanned: 189,
    leaksFound: 0,
    language: 'TypeScript',
    starsCount: 74200,
    forksCount: 5800,
    photoUrl:
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&auto=format&fit=crop&q=80',
    photoAlt: 'Vintage camera lens and minimalist hardware workstation',
    auditSummary:
      'High-grade Postgres infrastructure repository. Strict row-level security primitives and cryptographic JWT verification verified.',
    architectureType: 'Distributed PostgreSQL + Go Auth + TypeScript Client',
    scannedAt: 'Yesterday · 4:15 PM',
    checklist: [
      {
        id: 'chk-gitignore',
        title: '.gitignore Verification',
        description: 'Excludes local dev credentials and test databases.',
        passed: true,
        severity: 'CRITICAL',
        category: 'GIT_HYGIENE',
      },
      {
        id: 'chk-env-leaks',
        title: 'Environment Secrets Leak Scan',
        description: 'No production database credentials in repository tree.',
        passed: true,
        severity: 'CRITICAL',
        category: 'ENV_SECRETS',
      },
      {
        id: 'chk-ts-strict',
        title: 'TypeScript strict: true',
        description: 'High-assurance types across client and edge functions.',
        passed: true,
        severity: 'HIGH',
        category: 'TYPESCRIPT',
      },
      {
        id: 'chk-license',
        title: 'Open Source License File',
        description: 'Permissive Apache 2.0 / MIT license terms.',
        passed: true,
        severity: 'MEDIUM',
        category: 'LICENSE',
      },
    ],
    envHardening: {
      recommendedEnv: `# Supabase Edge Secrets
SUPABASE_URL=https://wnyyjswrwfhoosrovdfm.supabase.co
SERVICE_ROLE_KEY=eyJh...`,
      securityHeadersConfig: `// Hardened Edge Headers`,
      cspPolicy: `default-src 'self';`,
    },
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[3], INITIAL_BADGES[4]],
  },
  {
    id: 'repo-nextjs-framework',
    owner: 'vercel',
    name: 'next.js',
    fullName: 'vercel/next.js',
    repoUrl: 'https://github.com/vercel/next.js',
    branch: 'canary',
    securityScore: 95,
    filesScanned: 312,
    leaksFound: 0,
    language: 'Rust / TypeScript',
    starsCount: 124500,
    forksCount: 26400,
    photoUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    photoAlt: 'Minimal architectural concrete room with warm indirect daylight',
    auditSummary:
      'Turbo-charged hybrid web framework. Native Rust turbopack compiler and automated server/client boundary segregation.',
    architectureType: 'Next.js Turbopack + React Server Components',
    scannedAt: 'Nov 6 · 11:20 AM',
    checklist: [
      {
        id: 'chk-gitignore',
        title: '.gitignore Verification',
        description: 'Full workspace coverage across packages and test suites.',
        passed: true,
        severity: 'CRITICAL',
        category: 'GIT_HYGIENE',
      },
      {
        id: 'chk-env-leaks',
        title: 'Environment Secrets Leak Scan',
        description: 'Zero secrets committed.',
        passed: true,
        severity: 'CRITICAL',
        category: 'ENV_SECRETS',
      },
      {
        id: 'chk-license',
        title: 'MIT License File',
        description: 'Standard MIT Open Source License.',
        passed: true,
        severity: 'MEDIUM',
        category: 'LICENSE',
      },
    ],
    envHardening: {
      recommendedEnv: `PORT=3000\nNODE_ENV=production`,
      securityHeadersConfig: `// Next.js headers config`,
      cspPolicy: `default-src 'self'`,
    },
    badges: [INITIAL_BADGES[1], INITIAL_BADGES[2], INITIAL_BADGES[5]],
  },
];

export const INITIAL_LOGS: SecurityAuditLog[] = [
  {
    id: 'log-1',
    timestamp: 'Today · 8:32 AM',
    actionType: 'AUDIT_INITIATED',
    targetResource: 'vishwas-narayan/ship-club-engine',
    ipMasked: '192.168.1.xxx',
    status: 'SUCCESS',
    metadata: { score: 98, files: 42, leaks: 0 },
  },
  {
    id: 'log-2',
    timestamp: 'Today · 8:31 AM',
    actionType: 'RATE_LIMIT_CHECKED',
    targetResource: '/api/audit',
    ipMasked: '192.168.1.xxx',
    status: 'SUCCESS',
    metadata: { remaining: 19, limit: 20 },
  },
  {
    id: 'log-3',
    timestamp: 'Today · 8:30 AM',
    actionType: 'TOKEN_SECURED',
    targetResource: 'ServerSecrets:getServerSecrets()',
    ipMasked: '127.0.0.xxx',
    status: 'SUCCESS',
    metadata: { isolated: true, clientExposed: false },
  },
  {
    id: 'log-4',
    timestamp: 'Yesterday · 4:15 PM',
    actionType: 'ENV_CHECK_PASSED',
    targetResource: 'supabase/supabase',
    ipMasked: '73.189.44.xxx',
    status: 'SUCCESS',
    metadata: { checksPassed: 12, violations: 0 },
  },
  {
    id: 'log-5',
    timestamp: 'Nov 6 · 11:20 AM',
    actionType: 'README_COMPILED',
    targetResource: 'vercel/next.js',
    ipMasked: '142.250.80.xxx',
    status: 'SUCCESS',
    metadata: { generator: 'gemini-2.5-flash', lengthChars: 3840 },
  },
];

/**
 * Hook to manage reactive state across all pages
 */
export function useShipClubState() {
  const [activeMember, setActiveMember] = useState<BuilderMember>(INITIAL_MEMBERS[0]);
  const [studioTheme, setStudioTheme] = useState<StudioTheme>('brick');
  const [repos, setRepos] = useState<AuditedRepository[]>(INITIAL_REPOS);
  const [badges, setBadges] = useState<PillBadge[]>(INITIAL_BADGES);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>(INITIAL_LOGS);
  const [inspectedRepo, setInspectedRepo] = useState<AuditedRepository | null>(INITIAL_REPOS[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<'checklist' | 'readme' | 'env' | 'architecture'>('checklist');

  // Load persisted theme or custom repos if available in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('ship_club_theme') as StudioTheme;
      if (savedTheme) setStudioTheme(savedTheme);

      const savedActiveMemberId = localStorage.getItem('ship_club_active_member');
      if (savedActiveMemberId) {
        const found = INITIAL_MEMBERS.find((m) => m.id === savedActiveMemberId);
        if (found) setActiveMember(found);
      }
    }
  }, []);

  const switchTheme = (newTheme: StudioTheme) => {
    setStudioTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ship_club_theme', newTheme);
    }
  };

  const switchMember = (memberId: string) => {
    const found = INITIAL_MEMBERS.find((m) => m.id === memberId || m.handle === memberId);
    if (found) {
      setActiveMember(found);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ship_club_active_member', found.id);
      }
    }
  };

  const addScannedRepo = (repo: AuditedRepository) => {
    setRepos((prev) => [repo, ...prev]);
    setInspectedRepo(repo);
    setDrawerOpen(true);

    // Add corresponding audit log
    const newLog: SecurityAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actionType: 'AUDIT_INITIATED',
      targetResource: repo.fullName,
      ipMasked: '192.168.1.xxx',
      status: 'SUCCESS',
      metadata: {
        score: repo.securityScore,
        files: repo.filesScanned,
        leaks: repo.leaksFound,
      },
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const openInspector = (repo: AuditedRepository, tab: 'checklist' | 'readme' | 'env' | 'architecture' = 'checklist') => {
    setInspectedRepo(repo);
    setInspectorTab(tab);
    setDrawerOpen(true);
  };

  const closeInspector = () => {
    setDrawerOpen(false);
  };

  return {
    activeMember,
    studioTheme,
    repos,
    badges,
    auditLogs,
    inspectedRepo,
    drawerOpen,
    inspectorTab,
    switchTheme,
    switchMember,
    addScannedRepo,
    openInspector,
    closeInspector,
    setInspectorTab,
  };
}

