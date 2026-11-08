import React, { createContext, useContext } from 'react';
import { useShipClubState } from './clubStore';
import { AuditedRepository, BuilderMember, PillBadge, SecurityAuditLog, StudioTheme } from './types';

interface ClubContextType {
  activeMember: BuilderMember;
  studioTheme: StudioTheme;
  repos: AuditedRepository[];
  badges: PillBadge[];
  auditLogs: SecurityAuditLog[];
  inspectedRepo: AuditedRepository | null;
  drawerOpen: boolean;
  inspectorTab: 'checklist' | 'readme' | 'env' | 'architecture';
  switchTheme: (theme: StudioTheme) => void;
  switchMember: (memberId: string) => void;
  addScannedRepo: (repo: AuditedRepository) => void;
  openInspector: (repo: AuditedRepository, tab?: 'checklist' | 'readme' | 'env' | 'architecture') => void;
  closeInspector: () => void;
  setInspectorTab: (tab: 'checklist' | 'readme' | 'env' | 'architecture') => void;
}

const ClubContext = createContext<ClubContextType | null>(null);

export function ClubProvider({ children }: { children: React.ReactNode }) {
  const state = useShipClubState();
  return <ClubContext.Provider value={state}>{children}</ClubContext.Provider>;
}

export function useClub(): ClubContextType {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
}

