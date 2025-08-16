import React, { useMemo, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { fetchReplit } from '@/lib/replit';

export default function ReplitIntegration() {
  const { toast } = useToast();

  // We do NOT persist the token. For testing only; in production use a backend proxy.
  const [ephemeralToken, setEphemeralToken] = useState<string>('');
  const [workspace, setWorkspace] = useState<string>('');
  const [path, setPath] = useState<string>('main.py');
  const [content, setContent] = useState<string>('');
  const outRef = useRef<HTMLTextAreaElement>(null);

  const tokenToUse = useMemo(() => ephemeralToken.trim(), [ephemeralToken]);

  async function readFile() {
    try {
      const data = await fetchReplit({
        token: tokenToUse,
        path: '/v0/repls/file/get',
        body: { workspace, file: path },
      });
      setContent(data?.content ?? '');
      toast({ title: 'Read OK', description: `Loaded ${path}` });
    } catch (e: any) {
      toast({ title: 'Read failed', description: String(e?.message ?? e), variant: 'destructive' });
    }
  }

  async function writeFile() {
    try {
      await fetchReplit({
        token: tokenToUse,
        path: '/v0/repls/file/put',
        body: { workspace, file: path, content },
      });
      toast({ title: 'Write OK', description: `Saved ${path}` });
    } catch (e: any) {
      toast({ title: 'Write failed', description: String(e?.message ?? e), variant: 'destructive' });
    }
  }

  async function runCommand() {
    try {
      const data = await fetchReplit({
        token: tokenToUse,
        path: '/v0/repls/exec',
        body: { workspace, cmd: 'python', args: [path] },
      });
      if (outRef.current) outRef.current.value = data?.output ?? '';
      toast({ title: 'Executed', description: 'Command finished' });
    } catch (e: any) {
      toast({ title: 'Exec failed', description: String(e?.message ?? e), variant: 'destructive' });
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Replit Integration</h1>
      <p className="text-sm opacity-80">
        Temporary test UI to read/write files and run a command in a Replit workspace using an
        ephemeral token. Do not store tokens client-side in production—use a backend proxy.
      </p>

      <Card className="p-4 space-y-4">
        <div className="grid gap-3">
          <Label>Ephemeral Replit Token (testing only)</Label>
          <Input
            placeholder="Paste a short-lived token here"
            value={ephemeralToken}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEphemeralToken(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label>Workspace (slug or id)</Label>
            <Input placeholder="user/repl" value={workspace} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkspace(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>File path</Label>
            <Input placeholder="main.py" value={path} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPath(e.target.value)} />
          </div>
        </div>

        <Separator />

        <div className="grid gap-2">
          <Label>File content</Label>
          <Textarea rows={10} value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={readFile} variant="secondary">Read</Button>
          <Button onClick={writeFile}>Write</Button>
          <Button onClick={runCommand} variant="outline">Run `python {path}`</Button>
        </div>

        <Separator />

        <div className="grid gap-2">
          <Label>Command output</Label>
          <Textarea ref={outRef} rows={8} readOnly />
        </div>
      </Card>
    </div>
  );
}
