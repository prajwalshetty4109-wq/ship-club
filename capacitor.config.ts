export interface CapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  server?: {
    androidScheme?: string;
    cleartext?: boolean;
    url?: string;
  };
  backgroundColor?: string;
}

const config: CapacitorConfig = {
  appId: 'club.ship.app',
  appName: 'Ship Club',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  backgroundColor: '#000000',
};

export default config;
