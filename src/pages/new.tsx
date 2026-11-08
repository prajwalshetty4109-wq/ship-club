import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useClub } from '@/lib/ClubContext';
import { useRouter } from 'next/router';
import {
  Search,
  Sparkles,
  GitBranch,
  ShieldCheck,
  AlertCircle,
  Terminal,
  Lock,
} from 'lucide-react';

export default function NewScanPage() {
  const router = useRouter();
  const { addScannedRepo } = useClub();
  const [repoInput, setRepoInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const presets = [
    { label: 'vercel/next.js', url: 'https://github.com/vercel/next.js', lang: 'Rust/TS' },
    { label: 'supabase/supabase', url: 'https://github.com/supabase/supabase', lang: 'TypeScript' },
    { label: 'facebook/react', url: 'https://github.com/facebook/react', lang: 'JavaScript' },
    { label: 'tailwindlabs/tailwindcss', url: 'https://github.com/tailwindlabs/tailwindcss', lang: 'TypeScript' },
  ];

  const handleRunAudit = async (targetUrl?: string) => {
    const urlToScan = targetUrl || repoInput.trim();
    if (!urlToScan) {
      setErrorMsg('Please input a valid GitHub repository URL or handle (e.g. vercel/next.js)');
      return;
    }

    setErrorMsg(null);
    setIsScanning(true);
    setScanStep('Contacting GitHub REST API & verifying tree...');

    try {
      setTimeout(() => setScanStep('Inspecting .gitignore & scanning secrets leaks...'), 500);
      setTimeout(() => setScanStep('Validating TypeScript compiler options (strictNullChecks)...'), 1100);
      setTimeout(() => setScanStep('Compiling Pro README & architecture topology...'), 1600);

      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlToScan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete repository audit');
      }

      if (data.repository) {
        addScannedRepo(data.repository);
        router.push('/');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Scan failed';
      setErrorMsg(msg);
      setIsScanning(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-8 md:pt-14 space-y-10">
        {/* Header */}
        <div>
          <span className="font-editorial text-[11px] tracking-[0.25em] uppercase text-studio-olive font-bold flex items-center space-x-2 mb-2">
            <Lock size={13} />
            <span>AUTOMATED REPOSITORY AUDITOR</span>
          </span>
          <h1 className="font-scoreboard text-4xl md:text-5xl font-bold uppercase text-white tracking-tight">
            INSPECT & HARDEN GITHUB REPOSITORY
          </h1>
          <p className="font-editorial text-xs md:text-sm text-neutral-400 mt-2 leading-relaxed">
            Scan any public repository for environment leaks, TypeScript strictness, security headers, and generate a production-ready AI README.
          </p>
        </div>

        {/* Audit Input Form */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface border border-hairline shadow-2xl space-y-6">
          <div>
            <label className="font-editorial text-xs uppercase tracking-wider text-neutral-300 block mb-2">
              GitHub Repository URL or owner/repo
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="https://github.com/owner/repository or owner/repo"
                value={repoInput}
                onChange={(e) => {
                  setRepoInput(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isScanning) {
                    handleRunAudit();
                  }
                }}
                disabled={isScanning}
                className="w-full py-4 pl-12 pr-4 rounded-2xl bg-surface-elevated border border-hairline-bright focus:border-white text-white font-mono text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
              />
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-2.5">
              OR CHOOSE HIGH-PROFILE BENCHMARK PRESETS:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setRepoInput(preset.url);
                    handleRunAudit(preset.url);
                  }}
                  disabled={isScanning}
                  className="px-3.5 py-2 rounded-xl bg-surface-subtle border border-hairline hover:border-hairline-bright font-editorial text-xs text-neutral-300 hover:text-white transition-all flex items-center space-x-2 group"
                >
                  <GitBranch size={13} className="text-neutral-500 group-hover:text-studio-brick" />
                  <span>{preset.label}</span>
                  <span className="text-[10px] text-neutral-600">({preset.lang})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-studio-crimson/20 border border-studio-crimson/40 text-neutral-200 font-editorial text-xs flex items-center space-x-3">
              <AlertCircle size={16} className="text-studio-crimson shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Scanning Progress Status */}
          {isScanning && (
            <div className="p-5 rounded-2xl bg-surface-subtle border border-hairline space-y-3">
              <div className="flex items-center justify-between font-editorial text-xs">
                <span className="text-studio-olive flex items-center space-x-2 font-bold animate-pulse">
                  <Terminal size={14} />
                  <span>{scanStep}</span>
                </span>
                <span className="text-neutral-500">20 req/min rate checked</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                <div className="h-full bg-studio-brick rounded-full animate-pulse w-3/4" />
              </div>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="button"
            onClick={() => handleRunAudit()}
            disabled={isScanning}
            className="w-full py-4 rounded-2xl bg-white text-black font-editorial text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center space-x-2 shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {isScanning ? (
              <>
                <Sparkles size={16} className="animate-spin text-black" />
                <span>Auditing Security & Compiling README...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Execute 12-Point Security Inspection</span>
              </>
            )}
          </button>
        </div>

        {/* 12-Point Inspection Criteria Overview */}
        <div className="p-6 rounded-3xl bg-surface-subtle border border-hairline space-y-4">
          <h3 className="font-editorial text-xs font-bold uppercase tracking-wider text-neutral-300">
            Automated Inspection Standards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-neutral-400 font-editorial text-[11px]">
            <div className="flex items-start space-x-2">
              <span className="text-studio-olive font-bold">01.</span>
              <span>.gitignore credentials exclusion</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-studio-olive font-bold">02.</span>
              <span>Server-side secrets isolation (zero window leak)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-studio-olive font-bold">03.</span>
              <span>TypeScript compiler strictNullChecks</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-studio-olive font-bold">04.</span>
              <span>Sliding-window IP rate limiting verification</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-studio-olive font-bold">05.</span>
              <span>Content Security Policy & framing header check</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-studio-olive font-bold">06.</span>
              <span>AI README.md synthesis with architecture diagram</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

