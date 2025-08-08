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
    // Do NOT commit real keys. These are injected via EAS/GitHub secrets at build time.
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
    OPENAI_APP_KEY: process.env.OPENAI_APP_KEY ?? '',
    // Add any other runtime config you need here
  }
};

export default config;
