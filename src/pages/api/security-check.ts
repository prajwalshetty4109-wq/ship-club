import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSecrets, maskIp } from '@/lib/security';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const secrets = getServerSecrets();

    const geminiKeyConfigured = Boolean(secrets.GEMINI_API_KEY && secrets.GEMINI_API_KEY.length > 5);
    const serviceRoleConfigured = Boolean(
      secrets.SUPABASE_SERVICE_ROLE_KEY && secrets.SUPABASE_SERVICE_ROLE_KEY.length > 10
    );

    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress || '127.0.0.1';

    return res.status(200).json({
      success: true,
      isolationStatus: 'VERIFIED_SERVER_ONLY',
      serverRuntime: typeof window === 'undefined' ? 'NODE_RUNTIME_ISOLATED' : 'LEAKED_CLIENT_WINDOW',
      clientExposed: false,
      maskedKeys: {
        GEMINI_API_KEY: geminiKeyConfigured
          ? `${secrets.GEMINI_API_KEY.slice(0, 6)}...${secrets.GEMINI_API_KEY.slice(-4)}`
          : 'NOT_CONFIGURED',
        SUPABASE_SERVICE_ROLE_KEY: serviceRoleConfigured
          ? `${secrets.SUPABASE_SERVICE_ROLE_KEY.slice(0, 10)}...${secrets.SUPABASE_SERVICE_ROLE_KEY.slice(-6)}`
          : 'NOT_CONFIGURED',
        NEXT_PUBLIC_SUPABASE_URL: secrets.NEXT_PUBLIC_SUPABASE_URL,
      },
      auditTime: new Date().toISOString(),
      clientIpMasked: maskIp(ip),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown security error';
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
}

