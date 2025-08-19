// analytics.ts
// Drop-in analytics utility for Expo/React Native (works with ToolBridge, optional Firebase/Segment)

import { Platform } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { v4 as uuidv4 } from 'uuid';

const TOOLBRIDGE_URL = process.env.EXPO_PUBLIC_TOOLBRIDGE_URL || 'http://127.0.0.1:3030';

// Stable anon ID (persisted in local storage)
import AsyncStorage from '@react-native-async-storage/async-storage';
let anonId: string | null = null;
export async function getAnonId() {
  if (anonId) return anonId;
  anonId = await AsyncStorage.getItem('anon_id');
  if (!anonId) {
    anonId = uuidv4();
    await AsyncStorage.setItem('anon_id', anonId);
  }
  return anonId;
}

// Analytics core
export const Analytics = {
  userId: null as string | null,
  userProps: {} as Record<string, any>,

  async setUser(id: string | null) {
    this.userId = id;
  },
  setUserProps(props: Record<string, any>) {
    this.userProps = { ...this.userProps, ...props };
  },
  async event(event: string, properties: Record<string, any> = {}) {
    const id = this.userId || (await getAnonId());
    const payload = {
      event,
      userId: id,
      properties: {
        ...this.userProps,
        ...properties,
        device_anon_id: id,
        app_name: Constants.expoConfig?.name,
        app_version: Constants.expoConfig?.version,
        platform: Platform.OS,
        device_model: Device.modelName,
        os_version: Device.osVersion,
      },
    };
    try {
      await fetch(`${TOOLBRIDGE_URL}/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'trackEvent', input: { event, properties: payload.properties }, userId: id }),
      });
    } catch (e) {
      // fail silently
    }
  },
  async screen(name: string, props: Record<string, any> = {}) {
    await this.event('_screen', { name, ...props });
  },
  timers: {} as Record<string, number>,
  start(name: string) { this.timers[name] = Date.now(); },
  async end(name: string, extra: Record<string, any> = {}) {
    const t0 = this.timers[name];
    if (!t0) return;
    delete this.timers[name];
    await this.event('_timing', { name, ms: Date.now() - t0, ...extra });
  },
};

// Deterministic A/B testing
export function ab(userKey: string, experiment: string, variants: string[]): string {
  let hash = 0;
  for (let i = 0; i < userKey.length + experiment.length; i++) {
    hash = ((hash << 5) - hash) + (userKey.charCodeAt(i % userKey.length) ^ experiment.charCodeAt(i % experiment.length));
    hash |= 0;
  }
  return variants[Math.abs(hash) % variants.length];
}

// Usage example (in any screen/module):
// import { Analytics, ab } from './analytics';
// useEffect(() => { Analytics.screen('Home'); }, []);
// Analytics.event('login_success');
// const variant = ab(userId, 'paywall_copy', ['A', 'B']);
