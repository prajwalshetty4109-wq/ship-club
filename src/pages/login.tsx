import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useClub } from '@/lib/ClubContext';
import { supabase } from '@/lib/supabaseClient';
import { AuthCredentialsSchema } from '@/lib/security';
import { INITIAL_MEMBERS } from '@/lib/clubStore';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  AlertCircle,
  UserCheck,
  ArrowRight,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { switchMember, activeMember } = useClub();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const validation = AuthCredentialsSchema.safeParse({ email, password });
    if (!validation.success) {
      setAuthError(validation.error.errors[0]?.message || 'Invalid credentials');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setAuthSuccess('Account registered successfully! Check your email or sign in.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setAuthSuccess('Signed in successfully! Redirecting...');
        setTimeout(() => router.push('/'), 800);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoSwitch = (memberId: string) => {
    switchMember(memberId);
    setAuthSuccess(`Switched to active profile demo: ${memberId}`);
    setTimeout(() => router.push('/'), 600);
  };

  return (
    <div className="min-h-screen bg-oled text-white flex flex-col justify-center items-center p-4 md:p-8 relative overflow-hidden">
      {/* Top Studio Lighting Vignette */}
      <div className="fixed top-0 inset-x-0 h-[480px] pointer-events-none bg-[radial-gradient(ellipse_at_top,_#6B1414_0%,_#2A0707_45%,_#000000_80%)] opacity-85" />

      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-surface-elevated border border-hairline flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock size={22} className="text-studio-brick" />
          </div>
          <h1 className="font-scoreboard text-4xl font-bold uppercase tracking-tight text-white">
            SHIP CLUB AUTH
          </h1>
          <p className="font-editorial text-xs text-neutral-400 mt-1">
            Enterprise Supabase Authentication & Instant Demo Profiles
          </p>
        </div>

        {/* 1-Click Instant Demo Switcher */}
        <div className="p-5 rounded-3xl bg-surface border border-hairline shadow-2xl space-y-3">
          <span className="font-editorial text-[10px] tracking-[0.2em] uppercase text-neutral-500 block">
            1-CLICK INSTANT DEMO SWITCHER:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {INITIAL_MEMBERS.slice(0, 3).map((m) => {
              const isSelected = activeMember.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleQuickDemoSwitch(m.id)}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center transition-all ${
                    isSelected
                      ? 'bg-surface-elevated border-white text-white shadow-lg'
                      : 'bg-surface-subtle border-hairline hover:border-neutral-500 text-neutral-400'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.avatarUrl}
                    alt={m.name}
                    className="w-8 h-8 rounded-full object-cover mb-1.5 border border-white/20"
                  />
                  <span className="font-editorial text-[10px] font-bold block truncate max-w-full">
                    {m.handle}
                  </span>
                  <span className="font-stamp text-[9px] text-studio-olive block">
                    {m.avgScore}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Supabase Email/Password Form */}
        <form
          onSubmit={handleAuth}
          className="p-6 md:p-8 rounded-3xl bg-surface border border-hairline shadow-2xl space-y-5"
        >
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <span className="font-editorial text-xs font-bold uppercase text-white">
              {isSignUp ? 'Create Club Account' : 'Sign In With Supabase'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAuthError(null);
                setAuthSuccess(null);
              }}
              className="font-editorial text-[11px] text-neutral-400 hover:text-white uppercase transition-colors"
            >
              {isSignUp ? 'Already member? Sign in' : 'New builder? Sign up'}
            </button>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-studio-crimson/20 border border-studio-crimson/40 text-neutral-200 font-editorial text-xs flex items-center space-x-2">
              <AlertCircle size={15} className="text-studio-crimson shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-3.5 rounded-xl bg-studio-olive/20 border border-studio-olive/40 text-neutral-200 font-editorial text-xs flex items-center space-x-2">
              <ShieldCheck size={15} className="text-studio-olive shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="font-editorial text-[11px] uppercase tracking-wider text-neutral-400 block mb-1.5">
                Builder Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="builder@ship.club"
                  required
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-surface-elevated border border-hairline focus:border-white text-white font-mono text-xs placeholder:text-neutral-600 focus:outline-none"
                />
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>

            <div>
              <label className="font-editorial text-[11px] uppercase tracking-wider text-neutral-400 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-surface-elevated border border-hairline focus:border-white text-white font-mono text-xs placeholder:text-neutral-600 focus:outline-none"
                />
                <Key size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-white text-black font-editorial text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center space-x-2 shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <UserCheck size={16} />
                <span>{isSignUp ? 'Complete Registration' : 'Authenticate Session'}</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center font-editorial text-[10px] text-neutral-500 uppercase tracking-widest">
          OLED MATTE CANVAS · NO CLIENT SECRET LEAKS
        </div>
      </div>
    </div>
  );
}

