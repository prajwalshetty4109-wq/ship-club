import {
  checkRateLimit,
  sanitizeInput,
  maskIp,
  getServerSecrets,
  RepoScanSchema,
  ReadmeGenSchema,
  AuthCredentialsSchema,
} from '../lib/security';

describe('SHIP CLUB — Security & Systems Architecture Engine', () => {
  describe('1. Server-Side Secret Key Isolation (getServerSecrets)', () => {
    test('returns server secrets in Node.js runtime without exception', () => {
      const secrets = getServerSecrets();
      expect(secrets).toBeDefined();
      expect(typeof secrets.GEMINI_API_KEY).toBe('string');
      expect(typeof secrets.SUPABASE_SERVICE_ROLE_KEY).toBe('string');
      expect(typeof secrets.NEXT_PUBLIC_SUPABASE_URL).toBe('string');
    });

    test('throws runtime error if window object is spoofed as present', () => {
      // Simulate client window exposure
      (global as unknown as { window: unknown }).window = {};
      try {
        expect(() => getServerSecrets()).toThrow(
          /CRITICAL SECURITY VIOLATION: Attempted to access server-only secrets on the client window!/
        );
      } finally {
        delete (global as unknown as { window?: unknown }).window;
      }
    });
  });

  describe('2. Sliding-Window IP Rate Limiter (checkRateLimit)', () => {
    test('allows requests within limit and calculates remaining quota correctly', () => {
      const testIp = '10.0.0.42';
      const result1 = checkRateLimit(testIp, 5, 10000);
      expect(result1.allowed).toBe(true);
      expect(result1.current).toBe(1);
      expect(result1.remaining).toBe(4);

      const result2 = checkRateLimit(testIp, 5, 10000);
      expect(result2.allowed).toBe(true);
      expect(result2.current).toBe(2);
      expect(result2.remaining).toBe(3);
    });

    test('blocks requests once quota is exhausted', () => {
      const blockedIp = '10.0.0.99';
      for (let i = 0; i < 3; i++) {
        checkRateLimit(blockedIp, 3, 10000);
      }
      const blockedResult = checkRateLimit(blockedIp, 3, 10000);
      expect(blockedResult.allowed).toBe(false);
      expect(blockedResult.remaining).toBe(0);
      expect(blockedResult.resetInMs).toBeGreaterThan(0);
    });
  });

  describe('3. XSS Input Sanitizer (sanitizeInput)', () => {
    test('strips dangerous <script> tags', () => {
      const dirty = '<script>alert("hacked")</script>hello world';
      expect(sanitizeInput(dirty)).toBe('hello world');
    });

    test('strips iframe and inline event handlers', () => {
      const dirty = '<iframe src="evil.com"></iframe><img src="x" onerror="alert(1)">test';
      expect(sanitizeInput(dirty)).not.toContain('iframe');
      expect(sanitizeInput(dirty)).not.toContain('onerror');
    });

    test('strips javascript: pseudo-protocol', () => {
      const dirty = 'javascript:stealTokens()';
      expect(sanitizeInput(dirty)).not.toContain('javascript:');
    });
  });

  describe('4. Public Audit Log IP Masking (maskIp)', () => {
    test('masks IPv4 addresses to .xxx suffix', () => {
      expect(maskIp('192.168.1.45')).toBe('192.168.1.xxx');
      expect(maskIp('74.125.19.103')).toBe('74.125.19.xxx');
    });

    test('masks IPv6 addresses', () => {
      const v6 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
      expect(maskIp(v6)).toBe('2001:0db8:85a3:xxxx:xxxx');
    });
  });

  describe('5. Strict Zod Validation Schemas', () => {
    test('validates valid GitHub repository URLs and handles', () => {
      expect(RepoScanSchema.safeParse({ url: 'https://github.com/vercel/next.js' }).success).toBe(true);
      expect(RepoScanSchema.safeParse({ url: 'supabase/supabase' }).success).toBe(true);
      expect(RepoScanSchema.safeParse({ url: 'invalid-url-with-no-slash' }).success).toBe(false);
    });

    test('validates ReadmeGenSchema input structure', () => {
      const valid = {
        repoName: 'ship-club/engine',
        description: 'Automated Security Auditor',
        architecture: 'Next.js + Supabase',
        securityScore: 98,
      };
      expect(ReadmeGenSchema.safeParse(valid).success).toBe(true);
    });

    test('validates AuthCredentialsSchema requirements', () => {
      expect(AuthCredentialsSchema.safeParse({ email: 'builder@ship.club', password: 'securepassword123' }).success).toBe(true);
      expect(AuthCredentialsSchema.safeParse({ email: 'not-an-email', password: '123' }).success).toBe(false);
    });
  });
});

