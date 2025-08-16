import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Mo',
  slug: 'mo-app',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['ios', 'android'],
  extra: {
  eas: { projectId: '3e3bbdd4-d1be-4d0f-90a4-1020a49b0e73' }
  }
};

export default config;
