import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useClub } from '@/lib/ClubContext';
import { PillBadge3D } from '@/components/PillBadge3D';
import { StudioTheme } from '@/lib/types';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { studioTheme, switchTheme, badges } = useClub();
  const [step, setStep] = useState(1);

  // Step 1: Tech stack selection
  const [selectedStacks, setSelectedStacks] = useState<string[]>([
    'Next.js 14/15',
    'TypeScript Strict',
    'Supabase RLS',
  ]);

  // Step 2: Security rule toggles
  const [securityRules, setSecurityRules] = useState<{ [key: string]: boolean }>({
    secretsIsolation: true,
    slidingRateLimit: true,
    strictCsp: true,
    xssSanitizer: true,
  });

  // Step 3: Studio Lighting
  const themes: { id: StudioTheme; name: string; desc: string; color: string }[] = [
    { id: 'brick', name: 'Brick Crimson', desc: 'Diffused Terracotta radial studio lighting', color: '#6B1414' },
    { id: 'olive', name: 'Forest Olive', desc: 'Warm muted earth chartreuse ambiance', color: '#1C3015' },
    { id: 'amber', name: 'Warm Amber', desc: 'Analog darkroom tungsten warmth', color: '#3D2607' },
    { id: 'monochrome', name: 'Pure Monochrome', desc: 'Zero-tint high-contrast architectural black', color: '#262626' },
  ];

  const foundingBadge = badges.find((b) => b.id === 'badge-founding-auditor') || badges[0];

  const toggleStack = (stack: string) => {
    setSelectedStacks((prev) =>
      prev.includes(stack) ? prev.filter((s) => s !== stack) : [...prev, stack]
    );
  };

  const toggleRule = (ruleKey: string) => {
    setSecurityRules((prev) => ({
      ...prev,
      [ruleKey]: !prev[ruleKey],
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else router.push('/');
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-oled text-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden selection:bg-studio-brick">
      {/* Dynamic Top Lighting Vignette */}
      <div
        className="fixed top-0 inset-x-0 h-[480px] pointer-events-none transition-all duration-700 opacity-90"
        style={{
          background:
            studioTheme === 'olive'
              ? 'radial-gradient(ellipse at top, #1C3015 0%, #0D170A 45%, #000000 80%)'
              : studioTheme === 'amber'
              ? 'radial-gradient(ellipse at top, #3D2607 0%, #1F1303 45%, #000000 80%)'
              : studioTheme === 'monochrome'
              ? 'radial-gradient(ellipse at top, #262626 0%, #141414 45%, #000000 80%)'
              : 'radial-gradient(ellipse at top, #6B1414 0%, #2A0707 45%, #000000 80%)',
        }}
      />

      {/* Top Header & Progress Pills */}
      <div className="relative z-10 max-w-xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-surface-elevated border border-hairline flex items-center justify-center">
            <Lock size={14} className="text-white" />
          </div>
          <span className="font-scoreboard text-xl font-bold uppercase tracking-tight">
            SHIP CLUB
          </span>
        </div>

        {/* 4 Tactile Progress Pills */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-8 bg-white'
                  : i < step
                  ? 'w-3 bg-studio-olive'
                  : 'w-3 bg-surface-elevated border border-hairline'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Center Onboarding Steps */}
      <div className="relative z-10 max-w-xl mx-auto w-full my-auto py-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: TECH STACK SELECTION */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="font-editorial text-[10px] tracking-[0.25em] uppercase text-neutral-400">
                  STEP 01 OF 04 · ENVIRONMENT
                </span>
                <h2 className="font-scoreboard text-4xl md:text-5xl font-bold uppercase tracking-tight mt-1">
                  CHOOSE YOUR CORE STACK
                </h2>
                <p className="font-editorial text-xs text-neutral-400 mt-2">
                  Select the frameworks and languages you deploy to production. Ship Club tailors security heuristics to your stack.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Next.js 14/15',
                  'TypeScript Strict',
                  'Supabase RLS',
                  'Tailwind CSS',
                  'Rust / Turbopack',
                  'Go Microservices',
                ].map((stack) => {
                  const isSelected = selectedStacks.includes(stack);
                  return (
                    <motion.button
                      key={stack}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleStack(stack)}
                      className={`p-4 rounded-2xl border text-left font-editorial text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-surface-elevated border-white text-white font-bold shadow-lg'
                          : 'bg-surface border-hairline text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Layers size={14} className={isSelected ? 'text-studio-olive' : 'text-neutral-500'} />
                        <span>{stack}</span>
                      </div>
                      {isSelected && <Check size={14} className="text-studio-olive" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SECURITY RULES ENFORCEMENT */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="font-editorial text-[10px] tracking-[0.25em] uppercase text-neutral-400">
                  STEP 02 OF 04 · GOVERNANCE
                </span>
                <h2 className="font-scoreboard text-4xl md:text-5xl font-bold uppercase tracking-tight mt-1">
                  SECURITY GATES & CHECKS
                </h2>
                <p className="font-editorial text-xs text-neutral-400 mt-2">
                  Every audited repository runs these zero-trust tests automatically.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: 'secretsIsolation',
                    title: 'Server-Side Secret Key Isolation',
                    desc: 'Throws immediate error if process.env.API_KEY is accessed on client window.',
                  },
                  {
                    key: 'slidingRateLimit',
                    title: 'Sliding-Window IP Rate Limiter',
                    desc: '20 requests per 60,000ms window to block automated DDoS and token scraping.',
                  },
                  {
                    key: 'strictCsp',
                    title: 'Strict Frame & CSP Headers',
                    desc: 'X-Frame-Options: DENY and strict transport security across all endpoints.',
                  },
                  {
                    key: 'xssSanitizer',
                    title: 'XSS Input Sanitizer Gate',
                    desc: 'Sanitizes script tags, javascript: pseudo-protocols, and regex exploits.',
                  },
                ].map((rule) => {
                  const isChecked = securityRules[rule.key];
                  return (
                    <div
                      key={rule.key}
                      onClick={() => toggleRule(rule.key)}
                      className="p-4 rounded-2xl bg-surface border border-hairline hover:border-hairline-bright cursor-pointer transition-all flex items-start justify-between space-x-3"
                    >
                      <div className="space-y-1">
                        <span className="font-editorial text-xs font-bold text-white block">
                          {rule.title}
                        </span>
                        <span className="font-editorial text-[11px] text-neutral-400 block leading-relaxed">
                          {rule.desc}
                        </span>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-studio-olive text-black' : 'bg-surface-elevated border border-hairline'
                        }`}
                      >
                        {isChecked && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: STUDIO LIGHTING PICKER */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="font-editorial text-[10px] tracking-[0.25em] uppercase text-neutral-400">
                  STEP 03 OF 04 · AESTHETICS
                </span>
                <h2 className="font-scoreboard text-4xl md:text-5xl font-bold uppercase tracking-tight mt-1">
                  STUDIO TOP LIGHTING
                </h2>
                <p className="font-editorial text-xs text-neutral-400 mt-2">
                  Zero neon or generic sci-fi glows. Authentic warm physical studio lighting only.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {themes.map((th) => {
                  const isSelected = studioTheme === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => switchTheme(th.id)}
                      className={`p-4 rounded-2xl border text-left font-editorial text-xs transition-all relative overflow-hidden ${
                        isSelected
                          ? 'bg-surface-elevated border-white text-white shadow-xl'
                          : 'bg-surface border-hairline text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: th.color }}
                        />
                        <span className="font-bold text-white text-sm">{th.name}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-normal">{th.desc}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: 3D CERAMIC PILL UNLOCK CELEBRATION */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-center flex flex-col items-center"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-studio-olive/20 text-studio-olive border border-studio-olive/40 font-editorial text-[10px] font-bold tracking-widest uppercase">
                <Sparkles size={12} />
                <span>GENESIS COHORT BADGE UNLOCKED</span>
              </div>

              <div>
                <h2 className="font-scoreboard text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
                  FOUNDING AUDITOR
                </h2>
                <p className="font-editorial text-xs text-neutral-400 mt-2 max-w-sm mx-auto">
                  You are certified as a Founding Member of Ship Club. Your profile is hardened with Grade A+ baseline security.
                </p>
              </div>

              {/* 3D Tactile Ceramic Capsule Pill */}
              <motion.div
                initial={{ y: 20, rotateY: -30 }}
                animate={{ y: 0, rotateY: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="py-4"
              >
                <PillBadge3D badge={foundingBadge} />
              </motion.div>

              <div className="p-4 rounded-2xl bg-surface border border-hairline max-w-sm w-full text-left font-editorial text-[11px] text-neutral-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase">Charter ID</span>
                  <span className="font-mono text-white">#SC-2026-0811</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase">Material</span>
                  <span className="font-mono text-studio-ceramic">Matte White Ceramic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 uppercase">Status</span>
                  <span className="font-mono text-studio-olive">Verified Active</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="relative z-10 max-w-xl mx-auto w-full flex items-center justify-between pt-6 border-t border-hairline">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-3 rounded-2xl bg-surface border border-hairline hover:border-hairline-bright font-editorial text-xs uppercase tracking-wider text-neutral-300 flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3.5 rounded-2xl bg-white text-black font-editorial text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center space-x-2 shadow-xl"
        >
          <span>{step === 4 ? 'Enter Your Club' : 'Continue'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

