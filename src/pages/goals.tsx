import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useClub } from '@/lib/ClubContext';
import {
  Send,
  Terminal,
  Target,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  modelUsed?: string;
  timestamp: string;
}

export default function GoalsCopilotPage() {
  const { repos, activeMember } = useClub();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `### 🛡️ SHIP CLUB Security Copilot Active
Powered by **Gemini 2.5 Flash** server-side architecture analysis.
I can help inspect your repositories, patch secrets leaks, generate strict TypeScript configurations, and draft hardened CSP headers.

Ask a question or select a quick remediation prompt below.`,
      modelUsed: 'gemini-2.5-flash',
      timestamp: 'Today · 8:30 AM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts = [
    'How do I isolate Supabase service role keys from client bundles?',
    'Configure sliding-window IP rate limiting in Next.js',
    'Write production next.config.mjs security headers',
    'Generate safe .env.example with zero secret values',
  ];

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const activeRepo = repos[0];
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          repoContext: activeRepo
            ? {
                name: activeRepo.fullName,
                score: activeRepo.securityScore,
                language: activeRepo.language,
                leaks: activeRepo.leaksFound,
              }
            : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to query Security Copilot');
      }

      const assistantMsg: ChatMessage = {
        id: `assist-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        modelUsed: data.modelUsed,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Copilot error';
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `### ⚠️ Copilot Error\n${msg}\n\nPlease verify that your request adheres to the 20 requests/minute rate limit.`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 md:pt-14 space-y-8">
        {/* Goals & Copilot Header */}
        <div>
          <div className="flex items-center space-x-2 text-studio-olive mb-1">
            <Target size={16} />
            <span className="font-editorial text-[10px] uppercase tracking-[0.25em] font-bold">
              AI COPILOT & AUDIT GOALS
            </span>
          </div>
          <h1 className="font-scoreboard text-4xl md:text-5xl font-bold uppercase text-white tracking-tight">
            SECURITY COPILOT & REMEDIATION STUDIO
          </h1>
          <p className="font-editorial text-xs md:text-sm text-neutral-400 mt-2">
            Ask Gemini 2.5 Flash how to harden architectures, eliminate credential leaks, and enforce enterprise Next.js security standards.
          </p>
        </div>

        {/* Audit Milestone Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-surface border border-hairline">
            <div className="flex justify-between items-center mb-2">
              <span className="font-editorial text-[10px] tracking-widest uppercase text-neutral-400">
                GOAL 01 · REPO AUDITS
              </span>
              <span className="font-editorial text-xs text-studio-olive font-bold">142 / 200</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden mb-2">
              <div className="h-full bg-studio-olive w-[71%]" />
            </div>
            <p className="font-editorial text-[11px] text-neutral-400">
              Audit 200 repositories to unlock the Double Century trophy badge.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-hairline">
            <div className="flex justify-between items-center mb-2">
              <span className="font-editorial text-[10px] tracking-widest uppercase text-neutral-400">
                GOAL 02 · ZERO LEAK STREAK
              </span>
              <span className="font-editorial text-xs text-studio-amber font-bold">42 / 50 Days</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden mb-2">
              <div className="h-full bg-studio-amber w-[84%]" />
            </div>
            <p className="font-editorial text-[11px] text-neutral-400">
              Maintain zero secrets exposure across 50 consecutive days of commits.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-hairline">
            <div className="flex justify-between items-center mb-2">
              <span className="font-editorial text-[10px] tracking-widest uppercase text-neutral-400">
                GOAL 03 · PRO README ADOPTION
              </span>
              <span className="font-editorial text-xs text-studio-brick font-bold">100% Active</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden mb-2">
              <div className="h-full bg-studio-brick w-full" />
            </div>
            <p className="font-editorial text-[11px] text-neutral-400">
              Every audited repository equipped with autonomous documentation.
            </p>
          </div>
        </div>

        {/* Copilot Chat Window */}
        <div className="rounded-3xl bg-surface border border-hairline shadow-2xl flex flex-col h-[540px]">
          {/* Chat Window Header */}
          <div className="p-4 border-b border-hairline bg-surface-elevated/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-surface-elevated border border-hairline flex items-center justify-center text-white">
                <Bot size={16} />
              </div>
              <div>
                <span className="font-editorial text-xs font-bold text-white block">
                  Gemini 2.5 Flash Security Agent
                </span>
                <span className="font-editorial text-[9px] text-studio-olive block">
                  Server-Side Sandbox Active · 20 Req/Min Max
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-neutral-400 font-editorial text-[10px]">
              <span>Context: {repos[0]?.name || 'Active Session'}</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-editorial text-[10px] tracking-wider uppercase text-neutral-500">
                    {msg.sender === 'user' ? activeMember.handle : 'SHIP COPILOT'}
                  </span>
                  <span className="font-editorial text-[9px] text-neutral-600">
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-xl text-xs font-mono leading-relaxed relative group ${
                    msg.sender === 'user'
                      ? 'bg-white text-black font-semibold'
                      : 'bg-surface-elevated border border-hairline text-neutral-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-surface border border-hairline text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check size={12} className="text-studio-olive" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-studio-olive font-editorial text-xs animate-pulse p-2">
                <Terminal size={14} />
                <span>Gemini 2.5 Flash is inspecting architecture and drafting guidance...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 border-t border-hairline bg-surface-subtle overflow-x-auto flex items-center space-x-2 scrollbar-none">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-surface-elevated border border-hairline hover:border-hairline-bright font-editorial text-[11px] text-neutral-300 hover:text-white transition-all disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-hairline bg-surface-elevated/40 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask how to patch a leak, enforce strict TypeScript, or configure headers..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSend();
                }
              }}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl bg-surface border border-hairline-bright focus:border-white text-white font-mono text-xs placeholder:text-neutral-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-3 rounded-xl bg-white text-black font-editorial text-xs font-bold uppercase hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center space-x-1.5"
            >
              <Send size={14} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

