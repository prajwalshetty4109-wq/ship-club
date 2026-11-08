import { z } from 'zod';

/**
 * SHIP CLUB — Mandatory Backend Security, Auth & API-Hiding Engine
 * Zero `any` types, strict runtime isolation, and deterministic sanitization.
 */

export interface ServerSecrets {
  readonly GEMINI_API_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  readonly NEXT_PUBLIC_SUPABASE_URL: string;
}

/**
 * 1. Server-Side Secret Key Isolation
 * Throws an immediate runtime exception if executed in a browser/client bundle.
 */
export function getServerSecrets(): ServerSecrets {
  if (typeof window !== 'undefined') {
    throw new Error(
      'CRITICAL SECURITY VIOLATION: Attempted to access server-only secrets on the client window! Execution terminated.'
    );
  }

  const geminiKey = process.env.GEMINI_API_KEY || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wnyyjswrwfhoosrovdfm.supabase.co';

  return {
    GEMINI_API_KEY: geminiKey,
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
  };
}

/**
 * In-Memory sliding-window rate limit store
 */
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly current: number;
  readonly remaining: number;
  readonly limit: number;
  readonly resetInMs: number;
}

/**
 * 2. Sliding-Window IP Rate Limiter
 * 20 requests per 60,000ms window
 */
export function checkRateLimit(
  ip: string,
  limit: number = 20,
  windowMs: number = 60_000
): RateLimitResult {
  const now = Date.now();
  const cleanIp = ip.trim() || '127.0.0.1';

  let record = rateLimitStore.get(cleanIp);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(cleanIp, record);
  }

  // Filter timestamps within the current sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0] || now;
    const resetInMs = Math.max(0, windowMs - (now - oldest));
    return {
      allowed: false,
      current: record.timestamps.length,
      remaining: 0,
      limit,
      resetInMs,
    };
  }

  record.timestamps.push(now);
  const remaining = Math.max(0, limit - record.timestamps.length);
  const oldest = record.timestamps[0] || now;
  const resetInMs = Math.max(0, windowMs - (now - oldest));

  return {
    allowed: true,
    current: record.timestamps.length,
    remaining,
    limit,
    resetInMs,
  };
}

/**
 * 3. XSS Input Sanitizer
 * Strips script tags, iframes, inline event handlers, javascript pseudo-protocols, and unsafe HTML tags.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]+/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Mask IP addresses for public audit logging (e.g. 192.168.1.xxx)
 */
export function maskIp(ip: string): string {
  if (!ip) return '127.0.0.xxx';
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  }
  if (ip.includes(':')) {
    const v6Parts = ip.split(':');
    return `${v6Parts.slice(0, 3).join(':')}:xxxx:xxxx`;
  }
  return '192.168.1.xxx';
}

/**
 * 4. Strict Zod Validation Schemas
 */
export const RepoScanSchema = z.object({
  url: z
    .string()
    .min(3, 'Repository URL or path is required')
    .max(256, 'URL exceeds maximum length')
    .refine(
      (val) => {
        // Accepts github.com/owner/repo or owner/repo format
        return (
          /^https?:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+(\/)?$/.test(val) ||
          /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(val)
        );
      },
      {
        message: 'Must be a valid GitHub repo URL (e.g. https://github.com/owner/repo or owner/repo)',
      }
    ),
  branch: z.string().max(64).optional().default('main'),
});

export type RepoScanInput = z.infer<typeof RepoScanSchema>;

export const ReadmeGenSchema = z.object({
  repoName: z.string().min(1).max(128),
  description: z.string().max(512).optional().default(''),
  language: z.string().max(64).optional().default('TypeScript'),
  architecture: z.string().max(128).optional().default('Full-Stack Next.js'),
  features: z.array(z.string().max(256)).max(20).optional().default([]),
  securityScore: z.number().int().min(0).max(100).default(96),
});

export type ReadmeGenInput = z.infer<typeof ReadmeGenSchema>;

export const AuthCredentialsSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AuthCredentialsInput = z.infer<typeof AuthCredentialsSchema>;

export const CopilotPromptSchema = z.object({
  prompt: z.string().min(2, 'Prompt is too short').max(2000, 'Prompt exceeds limit'),
  repoContext: z
    .object({
      name: z.string(),
      score: z.number(),
      language: z.string(),
      leaks: z.number(),
    })
    .optional(),
});

export type CopilotPromptInput = z.infer<typeof CopilotPromptSchema>;

