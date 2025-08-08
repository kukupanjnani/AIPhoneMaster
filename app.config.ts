import 'dotenv/config';
import type { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'AIPhoneMaster',
  slug: 'aiphone-master',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['ios', 'android'],

  plugins: [
    ['react-native-edge-to-edge', { edgeToEdgeEnabled: true }],
  ],

  extra: {
    // Build-time vars (come from EAS Secrets or local .env)
    OPENAI_APP_KEY: process.env.OPENAI_APP_KEY ?? '',
    OPENAI_OWNER_KEY: process.env.OPENAI_OWNER_KEY ?? '',

    // EAS project id (required for remote builds)
    eas: {
      projectId: '3e3bbdd4-d1be-4d0f-90a4-1020a49b0e73',
    },
  },
};

export default config;
