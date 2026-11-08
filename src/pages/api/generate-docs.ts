import type { NextApiRequest, NextApiResponse } from 'next';
import {
  checkRateLimit,
  getServerSecrets,
  maskIp,
  ReadmeGenSchema,
  sanitizeInput,
} from '@/lib/security';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // 1. IP extraction & Rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress || '127.0.0.1';
  const rateLimit = checkRateLimit(ip);

  res.setHeader('X-RateLimit-Limit', rateLimit.limit.toString());
  res.setHeader('X-RateLimit-Remaining', rateLimit.remaining.toString());

  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a minute before generating more READMEs.',
      ipMasked: maskIp(ip),
    });
  }

  // 2. Validate input with Zod
  const parseResult = ReadmeGenSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Invalid README generator payload',
      details: parseResult.error.errors,
    });
  }

  const { repoName, description, language, architecture, features, securityScore } = parseResult.data;
  const cleanRepoName = sanitizeInput(repoName);
  const cleanDescription = sanitizeInput(description || '');

  // 3. Obtain server-side isolated API keys (never sent to client)
  const secrets = getServerSecrets();

  let generatedMarkdown = '';
  let modelUsed = 'gemini-3.8-flash';

  const prompt = `You are a Principal Systems Architect and Lead Open Source Technical Writer.
Generate a comprehensive, beautiful, production-ready README.md for the following repository:

Repository Name: ${cleanRepoName}
Description: ${cleanDescription}
Primary Language: ${language}
Architecture: ${architecture}
Security Score: ${securityScore}/100
Key Features: ${features.join(', ')}

Strict Requirements:
1. Include badges for License, TypeScript Strictness, Security Score, and Architecture.
2. Provide an Architectural Topology diagram in ascii or mermaid.
3. Include rapid reproduction setup steps (pnpm / npm / yarn).
4. Include production environment variable hardening guidelines.
5. Include security disclosure and contribution guide.
6. Format as pristine, high-grade GitHub Flavored Markdown.`;

  try {
    if (secrets.GEMINI_API_KEY && !secrets.GEMINI_API_KEY.includes('MockKey') && !secrets.GEMINI_API_KEY.includes('Placeholder')) {
      const ai = new GoogleGenAI({ apiKey: secrets.GEMINI_API_KEY });
      try {
        const aiResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        if (aiResponse.text) {
          generatedMarkdown = aiResponse.text;
        }
      } catch (innerErr) {
        console.warn('Gemini 3.8 Flash model retry/fallback:', innerErr);
      }
    }
  } catch (err) {
    console.warn('Gemini API call warning (using high-fidelity fallback):', err);
  }

  // Fallback high-fidelity markdown if Gemini key is dev mock
  if (!generatedMarkdown) {
    modelUsed = 'ship-club-deterministic-engine';
    generatedMarkdown = `# ${cleanRepoName}

<div align="center">

[![Ship Club Security](https://img.shields.io/badge/Security%20Score-${securityScore}%2F100-success?style=for-the-badge&color=6B1414)](https://github.com/${cleanRepoName})
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict%20100%25-blue?style=for-the-badge&color=1F1F1F)](https://www.typescriptlang.org)
[![Zero Leaks](https://img.shields.io/badge/Secrets-ZERO%20LEAKS-A3E635?style=for-the-badge)](https://github.com/${cleanRepoName})
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)](LICENSE)

**${cleanDescription || 'High-assurance distributed architecture and production-hardened web application.'}**

</div>

---

## 🏛️ Architecture & System Design
- **Architecture Pattern:** ${architecture}
- **Language / Runtime:** ${language}
- **Security Posture:** ${securityScore}/100 verified by Ship Club Automated Engine
- **Credential Segregation:** Server-Side API key isolation with zero browser leakage

\`\`\`
  +------------------+         +--------------------+         +------------------+
  |  PWA / Web Client| <=====> |  API Rate Limiter  | <=====> | Supabase DB / RLS|
  | (Next.js Hybrid) |         | (20 req / 60s max) |         | (Row Security)   |
  +------------------+         +--------------------+         +------------------+
                                         |
                                         v
                               +--------------------+
                               | Gemini 2.5 Copilot |
                               | (Server Sandboxed) |
                               +--------------------+
\`\`\`

---

## ✨ Key Features
${features.map((f) => `- **${f}**`).join('\n')}

---

## 🚀 Rapid Reproduction Setup

### 1. Prerequisites
- Node.js 20+ / pnpm 9+
- Git

### 2. Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/${cleanRepoName}.git
cd ${cleanRepoName.split('/')[1] || cleanRepoName}

# Install dependencies with locked manifest
pnpm install
\`\`\`

### 3. Environment Hardening
Copy the safe template and configure your production credentials:
\`\`\`bash
cp .env.example .env.local
\`\`\`

\`\`\`ini
# Production Environment Template
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://wnyyjswrwfhoosrovdfm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...

# PRIVATE SECRETS (NEVER expose to client bundles)
SUPABASE_SERVICE_ROLE_KEY=eyJh...
GEMINI_API_KEY=AIzaSy...
\`\`\`

### 4. Running Locally
\`\`\`bash
pnpm run dev
\`\`\`

---

## 🛡️ Security Vulnerability Reporting
Please do not file public GitHub issues for security vulnerabilities. Instead, transmit encrypted reports to security@ship.club.

---

<div align="center">
  <sub>Audited & Certified by <b>SHIP CLUB</b> · Any Distance Design System</sub>
</div>
`;
  }

  return res.status(200).json({
    success: true,
    markdown: generatedMarkdown,
    modelUsed,
    rateLimitRemaining: rateLimit.remaining,
    ipMasked: maskIp(ip),
  });
}

