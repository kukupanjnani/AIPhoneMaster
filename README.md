# AIPhoneMaster

## Local development

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the Expo dev server
   ```bash
   npm run dev
   ```

## Production build

Create a production bundle of the web app:
```bash
npm run build
```

## Local Android APK build

Generate a release APK without EAS by running:
```bash
npm run android:build
```
This runs `npx expo prebuild` and builds a release APK via Gradle which can be found under `android/app/build/outputs/apk/release`.
