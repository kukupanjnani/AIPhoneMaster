// app/screens/ReplitIntegration.tsx
import React, { useMemo, useRef, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { fetchReplit } from '../lib/replit';

export default function ReplitIntegration() {
  const [token, setToken] = useState('');
  const [workspace, setWorkspace] = useState('');
  const [filePath, setFilePath] = useState('main.py');
  const [content, setContent] = useState('');
  const [output, setOutput] = useState('');

  const tokenToUse = useMemo(() => token.trim(), [token]);

  async function readFile() {
    try {
      const data = await fetchReplit({
        token: tokenToUse,
        path: '/v0/repls/file/get',
        body: { workspace, file: filePath },
      });
      setContent(data?.content ?? '');
      Alert.alert('Read OK', `Loaded ${filePath}`);
    } catch (e: any) {
      Alert.alert('Read failed', String(e?.message ?? e));
    }
  }

  async function writeFile() {
    try {
      await fetchReplit({
        token: tokenToUse,
        path: '/v0/repls/file/put',
        body: { workspace, file: filePath, content },
      });
      Alert.alert('Write OK', `Saved ${filePath}`);
    } catch (e: any) {
      Alert.alert('Write failed', String(e?.message ?? e));
    }
  }

  async function runCommand() {
    try {
      const data = await fetchReplit({
        token: tokenToUse,
        path: '/v0/repls/exec',
        body: { workspace, cmd: 'python', args: [filePath] },
      });
      setOutput(data?.output ?? '');
      Alert.alert('Executed', 'Command finished');
    } catch (e: any) {
      Alert.alert('Exec failed', String(e?.message ?? e));
    }
  }

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>Replit Integration (Mobile)</Text>
      <Text style={s.note}>
        Paste a short-lived Replit token (testing only). Do not store tokens on device. In production, use a backend proxy.
      </Text>

      <View style={s.field}>
        <Text style={s.label}>Ephemeral Token</Text>
        <TextInput
          style={s.input}
          placeholder="Paste token"
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={s.field}>
        <Text style={s.label}>Workspace (slug or id)</Text>
        <TextInput
          style={s.input}
          placeholder="user/repl"
          value={workspace}
          onChangeText={setWorkspace}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={s.field}>
        <Text style={s.label}>File Path</Text>
        <TextInput
          style={s.input}
          placeholder="main.py"
          value={filePath}
          onChangeText={setFilePath}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={s.field}>
        <Text style={s.label}>File Content</Text>
        <TextInput
          style={[s.input, s.multiline]}
          placeholder="File content here..."
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>

      <View style={s.row}>
        <View style={s.btn}><Button title="Read" onPress={readFile} /></View>
        <View style={s.btn}><Button title="Write" onPress={writeFile} /></View>
        <View style={s.btn}><Button title="Run python" onPress={runCommand} /></View>
      </View>

      <View style={s.field}>
        <Text style={s.label}>Command Output</Text>
        <TextInput
          style={[s.input, s.multiline]}
          value={output}
          editable={false}
          multiline
        />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  note: { color: '#666' },
  field: { gap: 6 },
  label: { fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10,
    backgroundColor: '#fff',
  },
  multiline: { height: 160, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 8, justifyContent: 'space-between' },
  btn: { flex: 1 },
});
