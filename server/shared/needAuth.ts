export function needAuth(platform: string) {
  // Return need_auth response, trigger PKCE/OAuth flow on client
  return { need_auth: true, platform };
}
