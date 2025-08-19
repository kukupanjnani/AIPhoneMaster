export async function needAuth(platform: string) {
  // Launch OAuth/PKCE flow for platform, store tokens in SecureStore
  // Example: openAuthSessionAsync(...)
  console.log('[needAuth]', platform);
}
