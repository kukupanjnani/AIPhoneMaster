export async function callTool(tool: string, input: any) {
  // Call ToolBridge endpoint, inject tokens as needed
  // Example: fetch('http://127.0.0.1:3030/call', { method: 'POST', body: JSON.stringify({ tool, input }) });
  return { ok: true };
}
