// callToolBridge.ts
// Shared utility for calling ToolBridge /call endpoint with robust error/auth handling

export async function callToolBridge({
  tool,
  input = {},
  userId,
  tokens = {},
  onNeedAuth,
  onRateLimited,
  onPolicyError,
  endpoint = "http://127.0.0.1:3030/call"
}: {
  tool: string;
  input?: any;
  userId?: string;
  tokens?: Record<string, string>;
  onNeedAuth?: (needAuth: any) => void;
  onRateLimited?: (retrySeconds: number) => void;
  onPolicyError?: (policyError: any) => void;
  endpoint?: string;
}) {
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tool,
      input,
      userId,
      auth: { tokens }
    })
  });
  const data = await resp.json();
  if (data.data?.need_auth && onNeedAuth) {
    onNeedAuth(data.data);
    return { needAuth: true };
  }
  if (data.error === "rate_limited" && onRateLimited) {
    onRateLimited(data.retry_hint_seconds || 2);
    return { rateLimited: true };
  }
  if (data.data?.policy_error && onPolicyError) {
    onPolicyError(data.data.policy_error);
    return { policyError: true };
  }
  return data;
}
