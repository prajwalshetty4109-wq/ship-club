# SHIP CLUB (ship.club)

> **Automated GitHub Repository Security Auditor, Architecture Inspector, and AI `README.md` Studio** built for Web, PWA, iOS, Android, macOS, and Windows.

---

## 🎨 Visual Mandate & Design System (Strict "Any Distance" + Skiper UI)

- **Zero Forbidden Colors:** Strictly **ZERO** purple, violet, indigo, fuchsia, neon cyan, or glowing sci-fi gradients.
- **OLED Matte Canvas:** Pure `#000000` base with `#111111` warm charcoal surfaces and `1px solid #1F1F1F` structural hairlines.
- **Warm Studio Top Lighting:** Diffused Terracotta / Brick Crimson radial studio vignette (`bg-[radial-gradient(ellipse_at_top,_#6B1414_0%,_#2A0707_45%,_#000000_80%)]`), with runtime switchable themes (`Brick Crimson`, `Forest Olive`, `Warm Amber`, `Pure Monochrome`).
- **Three-Font Editorial Pairing:**
  - `Antonio` (700 weight): Towering narrow condensed scoreboard numbers (`text-[64px] md:text-[74px] font-bold tracking-tighter leading-[0.86] text-white tabular-nums`).
  - `Space Mono` (400/700 weight): Curved SVG `<textPath>` club header (`VISHWAS'S BUILDER CLUB`), vertical pill portrait avatar, wide-tracked sub-labels (`AVG SCORE`, `FILES READ`, `LEAKS FOUND`, `MEDALS`).
  - `Syne` (800 ExtraBold): Wide, stretched telemetry stamps (`98/100`, `42 FILES`) overlaid on photography cards.
- **Tactile 3D Collectible Pill Badges:**
  - Vertical capsule-shaped 3D pills (`w-[72px] h-[112px] rounded-full`) in **Matte White Ceramic** (`#E5E5E5`), **Brushed Gunmetal** (`#262626`), **Raw Silver** (`#A3A3A3`), and **Warm Chartreuse/Olive** (`#A3E635`) with authentic inner-bevel studio shadows (`box-shadow: inset 0 2px 5px rgba(255,255,255,0.65), inset 0 -6px 10px rgba(0,0,0,0.85), 0 12px 24px rgba(0,0,0,0.75)`).
- **Full-Bleed Real-Life Editorial Photography Cards:**
  - High-resolution warm documentary/workspace Unsplash photography with natural dark vignettes, top-left white Git vector icon + wide `Syne` score stamp, and bottom-right overlapping stack of 3 earned miniature 3D capsule pills.

---

## 📦 Skiper UI Components

1. **`src/components/Skiper6HoverMembers.tsx` (`@skiper-ui/skiper6`):**
   - Interactive row of vertical pill portrait avatars for the club's top builders (`@vishwas`, `@johnsmith`, `@lynetteyap`, `@alex_kern`, `@sara_dev`).
   - Hovering over any portrait smoothly scales the portrait (`scale: 1.14, y: -8`), dims non-hovered members (`opacity: 0.38`), shows spring-animated score pill badge, and triggers a **staggered split-character vertical roll reveal** (`y: '100%' -> '0%'`) of the builder's full name in towering `Antonio` typography below the avatars.
   - Clicking any avatar switches the active demo profile across the entire application.
2. **`src/components/Skiper19SvgScroll.tsx` (`@skiper-ui/skiper19`):**
   - Uses `useScroll()` and `useSpring()` from `framer-motion` to animate a sweeping curved SVG `<motion.path>` (`style={{ pathLength }}`) down the background of the Club Feed in warm Terracotta Crimson (`#991B1B`) over a dashed `#1F1F1F` technical track line.

---

## 🛡️ Enterprise Backend Security (`src/lib/security.ts`)

1. **Server-Side Secret Key Isolation (`getServerSecrets`):**
   - Throws immediate runtime exception if `typeof window !== 'undefined'`.
   - `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are accessible only inside `/src/pages/api/*` routes.
2. **Sliding-Window IP Rate Limiter (`checkRateLimit`):**
   - Tracks client IP request timestamps in memory (`20 requests per 60,000ms window`).
   - Sets `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers on every API response.
3. **XSS Input Sanitizer (`sanitizeInput`):**
   - Strips `<script>`, `<iframe>`, `javascript:`, inline event handlers, and `< >` tags from user inputs.
4. **Strict Zod Schemas:**
   - `RepoScanSchema`, `ReadmeGenSchema`, `AuthCredentialsSchema`, and `CopilotPromptSchema` with zero `any` types.

---

## 🚀 Getting Started

### 1. Installation
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Create `.env.local` (already excluded in `.gitignore`):
\`\`\`ini
NEXT_PUBLIC_SUPABASE_URL=https://wnyyjswrwfhoosrovdfm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GEMINI_API_KEY=AIzaSy...
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Navigate to `http://localhost:3000`.

### 4. Run Jest Unit Tests
\`\`\`bash
npm test
\`\`\`

### 5. Production Build
\`\`\`bash
npm run build
\`\`\`

---

## 🏛️ Database Schema & RLS Policies
The complete PostgreSQL / Supabase schema is located in `supabase/schema.sql`, featuring:
- `profiles` table with public read & owner update policies
- `audited_repositories` table with public read & authenticated write policies
- `builder_badges` table for collectible 3D pill badges
- `security_audit_logs` table for immutable system audit records

---

*Designed for Apple Design Award Aesthetics & Enterprise-Grade Security Isolation.*

