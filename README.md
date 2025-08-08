# AIPhoneMaster

## Getting Started

1. **Install dependencies**
   ```bash
   npm ci
   ```
2. **Copy environment variables**
   ```bash
   cp .env.example .env
   # edit .env with your values
   ```
3. **Run the app locally**
   ```bash
   npm run dev
   ```

## Production Build

```bash
npm run build
```

## Local Android Release APK

```bash
npm run android:build
```
This runs `npx expo prebuild` and then `./gradlew assembleRelease` to produce an APK in `android/app/build/outputs/apk/release/`.
