import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wnyyjswrwfhoosrovdfm.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndueXlqc3dyd2Zob29zcm92ZGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMTU3NDcsImV4cCI6MjEwODY5MTc0N30.5pNyWBYt40SP9VEsg_KHeEE_f9T0errsHEMCrCk4pIw';

/**
 * Public client for client-side queries
 * Never contains or uses the SUPABASE_SERVICE_ROLE_KEY.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

