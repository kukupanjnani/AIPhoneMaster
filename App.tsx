import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import ReplitIntegration from './app/screens/ReplitIntegration';

type Screen = 'HOME' | 'REPLIT';

export default function App() {
  const [screen, setScreen] = useState<Screen>('HOME');

  if (screen === 'REPLIT') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Button title="← Back" onPress={() => setScreen('HOME')} />
          <Text style={styles.title}>Mo — Tools</Text>
          <View style={{ width: 80 }} />
        </View>
        <ReplitIntegration />
      </SafeAreaView>
    );
  }

  // HOME
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Mo</Text>
        <Text style={styles.subtitle}>AI tools, on your phone</Text>
        <View style={{ height: 12 }} />
        <Button title="Open Replit Integration" onPress={() => setScreen('REPLIT')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ddd',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#666' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
