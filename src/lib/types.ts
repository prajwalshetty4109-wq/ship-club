export type StudioTheme = 'brick' | 'olive' | 'amber' | 'monochrome';

export type BadgeMaterial = 'ceramic' | 'gunmetal' | 'silver' | 'chartreuse';

export interface PillBadge {
  id: string;
  title: string;
  subtitle: string;
  material: BadgeMaterial;
  unlocked: boolean;
  unlockedAt?: string;
  description: string;
  iconName: string;
}

export interface SecurityCheckItem {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'ENV_SECRETS' | 'TYPESCRIPT' | 'GIT_HYGIENE' | 'CI_CD' | 'LICENSE' | 'HEADERS';
  evidence?: string;
}

export interface AuditedRepository {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  repoUrl: string;
  branch: string;
  securityScore: number;
  filesScanned: number;
  leaksFound: number;
  language: string;
  starsCount: number;
  forksCount: number;
  photoUrl: string;
  photoAlt: string;
  auditSummary: string;
  architectureType: string;
  checklist: SecurityCheckItem[];
  envHardening: {
    recommendedEnv: string;
    securityHeadersConfig: string;
    cspPolicy: string;
  };
  badges: PillBadge[];
  scannedAt: string;
  isCustomScanned?: boolean;
}

export interface BuilderMember {
  id: string;
  handle: string;
  name: string;
  role: string;
  avatarUrl: string;
  avgScore: number;
  reposAudited: number;
  leaksFound: number;
  medalsEarned: number;
  streakDays: number;
  bio: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  actionType: 'AUDIT_INITIATED' | 'ENV_CHECK_PASSED' | 'RATE_LIMIT_CHECKED' | 'TOKEN_SECURED' | 'README_COMPILED' | 'COPILOT_QUERY';
  targetResource: string;
  ipMasked: string;
  status: 'SUCCESS' | 'WARNING' | 'BLOCKED';
  metadata?: Record<string, string | number | boolean>;
}

