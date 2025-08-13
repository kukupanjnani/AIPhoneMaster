import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.moappdev.platform',
  appName: 'MO APP DEVELOPMENT',
  webDir: 'server/dist/public',
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    url: 'http://localhost:5000'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'APK'
    }
  },
  plugins: {
    App: {
      statusBarColor: '#000000',
      statusBarStyle: 'dark',
      statusBarBackgroundColor: '#000000'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#000000'
    }
  }
};

export default config;