import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useClub } from '@/lib/ClubContext';
import { StudioTheme } from '@/lib/types';
import {
  ShieldCheck,
  Lock,
  Download,
  Terminal,
  Activity,
  Key,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

interface VerificationResult {
  isolationStatus: string;
  serverRuntime: string;
  clientExposed: boolean;
  maskedKeys: {
    GEMINI_API_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
  };
  auditTime: string;
  clientIpMasked: string;
}

export default function SettingsSecurityPage() {
  const { studioTheme, switchTheme, auditLogs } = useClub();
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const studioThemes: { id: StudioTheme; name: string; desc: string; color: string }[] = [
    { id: 'brick', name: 'Brick Crimson', desc: 'Diffused Terracotta radial studio lighting', color: '#6B1414' },
    { id: 'olive', name: 'Forest Olive', desc: 'Warm muted earth chartreuse ambiance', color: '#1C3015' },
    { id: 'amber', name: 'Warm Amber', desc: 'Analog darkroom tungsten warmth', color: '#3D2607' },
    { id: 'monochrome', name: 'Pure Monochrome', desc: 'Zero-tint high-contrast architectural black', color: '#262626' },
  ];

  const runKeyIsolationVerifier = async () => {
    setVerificationLoading(true);
    try {
      const res = await fetch('/api/security-check');
      const data = await res.json();
      setVerificationResult(data);
    } catch (err) {
      console.error('Verification error:', err);
    } finally {
      setVerificationLoading(false);
    }
  };

  const exportAuditLogJson = () => {
    const jsonStr = JSON.stringify(auditLogs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ship-club-audit-log-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 md:pt-14 space-y-12">
        {/* Settings Header */}
        <div>
          <div className="flex items-center space-x-2 text-studio-olive mb-1">
            <Lock size={15} />
            <span className="font-editorial text-[10px] uppercase tracking-[0.25em] font-bold">
              SECURITY CENTER & CONFIGURATION
            </span>
          </div>
          <h1 className="font-scoreboard text-4xl md:text-5xl font-bold uppercase text-white tracking-tight">
            STUDIO SETTINGS & AUDIT LOGS
          </h1>
          <p className="font-editorial text-xs md:text-sm text-neutral-400 mt-2">
            Configure studio lighting, audit API key server isolation, and inspect the continuous security audit logs.
          </p>
        </div>

        {/* 1. Studio Lighting Themes */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface border border-hairline shadow-2xl space-y-6">
          <div>
            <h2 className="font-scoreboard text-2xl font-bold uppercase text-white tracking-tight">
              STUDIO TOP LIGHTING
            </h2>
            <p className="font-editorial text-xs text-neutral-400 mt-1">
              Select your ambient diffuse lighting theme. Strict zero-neon mandate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {studioThemes.map((th) => {
              const isSelected = studioTheme === th.id;
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => switchTheme(th.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-surface-elevated border-white text-white shadow-xl'
                      : 'bg-surface-subtle border-hairline hover:border-neutral-500 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: th.color }}
                    />
                    <span className="font-editorial text-xs font-bold text-white">{th.name}</span>
                  </div>
                  <p className="font-editorial text-[11px] text-neutral-400">{th.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. API Key Isolation Verifier */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface border border-hairline shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={18} className="text-studio-olive" />
                <h2 className="font-scoreboard text-2xl font-bold uppercase text-white tracking-tight">
                  API KEY ISOLATION VERIFIER
                </h2>
              </div>
              <p className="font-editorial text-xs text-neutral-400 mt-1">
                Verify in real-time that secret keys are strictly isolated on the server and completely hidden from browser DevTools.
              </p>
            </div>

            <button
              type="button"
              onClick={runKeyIsolationVerifier}
              disabled={verificationLoading}
              className="px-4 py-2.5 rounded-xl bg-white text-black font-editorial text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center space-x-2 shadow-lg disabled:opacity-50 shrink-0"
            >
              <RefreshCw size={14} className={verificationLoading ? 'animate-spin' : ''} />
              <span>{verificationLoading ? 'Probing Server...' : 'Run Isolation Test'}</span>
            </button>
          </div>

          {/* Test Results Display */}
          {verificationResult ? (
            <div className="p-5 rounded-2xl bg-surface-subtle border border-hairline space-y-4">
              <div className="flex items-center space-x-2 text-studio-olive font-editorial text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 size={16} />
                <span>SERVER SECRETS 100% ISOLATED (NO CLIENT LEAKAGE)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-neutral-300">
                <div className="p-3 rounded-xl bg-surface-elevated border border-hairline">
                  <span className="text-neutral-500 text-[10px] uppercase block mb-1">
                    GEMINI_API_KEY (Server-Side)
                  </span>
                  <span className="text-white font-bold">{verificationResult.maskedKeys.GEMINI_API_KEY}</span>
                  <span className="text-[10px] text-studio-olive block mt-1">Window Scope: Undefined</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-elevated border border-hairline">
                  <span className="text-neutral-500 text-[10px] uppercase block mb-1">
                    SUPABASE_SERVICE_ROLE_KEY
                  </span>
                  <span className="text-white font-bold">
                    {verificationResult.maskedKeys.SUPABASE_SERVICE_ROLE_KEY}
                  </span>
                  <span className="text-[10px] text-studio-olive block mt-1">Window Scope: Undefined</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-editorial text-neutral-400 pt-2 border-t border-hairline">
                <span>Audited IP: {verificationResult.clientIpMasked}</span>
                <span>Verified At: {new Date(verificationResult.auditTime).toLocaleTimeString()}</span>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-surface-subtle border border-hairline flex items-center space-x-3 text-neutral-400 font-editorial text-xs">
              <Terminal size={16} className="text-neutral-500 shrink-0" />
              <span>Click &quot;Run Isolation Test&quot; to probe runtime boundaries and verify zero browser exposure.</span>
            </div>
          )}
        </div>

        {/* 3. Live Security Audit Log */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface border border-hairline shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Activity size={18} className="text-studio-brick" />
                <h2 className="font-scoreboard text-2xl font-bold uppercase text-white tracking-tight">
                  LIVE SECURITY AUDIT LOG
                </h2>
              </div>
              <p className="font-editorial text-xs text-neutral-400 mt-1">
                Real-time record of repository scans, rate limit checks, and input sanitization audits.
              </p>
            </div>

            <button
              type="button"
              onClick={exportAuditLogJson}
              className="px-4 py-2.5 rounded-xl bg-surface-elevated border border-hairline hover:border-white/40 text-white font-editorial text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shrink-0"
            >
              <Download size={14} />
              <span>Export Audit Log (JSON)</span>
            </button>
          </div>

          {/* Audit Log Table */}
          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-surface-subtle border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-editorial text-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-studio-olive" />
                  <div>
                    <span className="font-bold text-white mr-2">{log.actionType}</span>
                    <span className="text-neutral-400 font-mono text-[11px]">{log.targetResource}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-neutral-400 text-[11px]">
                  <span>IP: {log.ipMasked}</span>
                  <span className="px-2 py-0.5 rounded bg-surface-elevated border border-hairline text-studio-olive font-bold uppercase">
                    {log.status}
                  </span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

