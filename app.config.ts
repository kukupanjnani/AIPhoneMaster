import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Mo',
  slug: 'mo-app',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['ios', 'android'],
  extra: {
    eas: { projectId: 'YOUR_EAS_PROJECT_ID' }
  }
};

export default config;
