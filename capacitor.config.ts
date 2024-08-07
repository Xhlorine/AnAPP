import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'telepathy',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
