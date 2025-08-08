import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'AIPhoneMaster',
  slug: 'AIPhoneMaster',
  version: '1.0.0',
  android: {
    package: 'com.moappdev.platform',
  },
  extra: {
    apiUrl: process.env.API_URL ?? 'http://localhost:3000',
  },
});
