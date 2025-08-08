import 'dotenv/config';
import type { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'AIPhoneMaster',
  slug: 'aiphone-master',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['ios', 'android'],

  plugins: [
    // Optional: explicit edge-to-edge config (Android 16+ will enforce it anyway)
    ['react-native-edge-to-edge', { edgeToEdgeEnabled: true }]
  ],

  extra: {
    // Runtime envs (populated from EAS secrets or local .env)
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
    OPENAI_APP_KEY: process.env.OPENAI_APP_KEY ?? '',

    // ✅ EAS project ID
    eas: {
      projectId: '3e3bbdd4-d1be-4d0f-90a4-1020a49b0e73'
    }
  }
};

export default config;
