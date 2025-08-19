// analyticsContext.tsx
// Efficient, auto-tracking analytics context for Expo/React Native
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { NavigationContainerRef, useNavigationContainerRef } from '@react-navigation/native';
import { Analytics, ab } from './analytics';

// Type-safe event names
export type AnalyticsEvent =
  | 'app_open' | 'app_background' | 'login_success' | 'login_failure' | 'logout'
  | 'post_create' | 'post_publish' | 'media_upload' | 'media_fail'
  | 'paper_order_place' | 'paper_flatall' | 'paper_pnl_view'
  | 'paylink_create' | 'pay_status_ok' | 'pay_status_fail'
  | 'job_schedule' | 'job_retry' | 'job_fail'
  | 'exception' | 'hello_from_app' | '_screen' | '_timing';

interface AnalyticsContextProps {
  userId: string | null;
  setUser: (id: string | null) => void;
  setUserProps: (props: Record<string, any>) => void;
  event: (event: AnalyticsEvent, props?: Record<string, any>) => void;
  screen: (name: string, props?: Record<string, any>) => void;
  ab: typeof ab;
}

const AnalyticsContext = createContext<AnalyticsContextProps | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const buffer = useRef<any[]>([]);
  const flushTimeout = useRef<NodeJS.Timeout | null>(null);
  const navRef = useNavigationContainerRef();
  const lastScreen = useRef<string | null>(null);

  // Batched event sender
  const flush = async () => {
    if (buffer.current.length === 0) return;
    const batch = buffer.current.splice(0, buffer.current.length);
    await Promise.all(batch.map(e => Analytics.event(e.event, e.props)));
  };
  const queue = (event: AnalyticsEvent, props?: Record<string, any>) => {
    buffer.current.push({ event, props });
    if (!flushTimeout.current) {
      flushTimeout.current = setTimeout(() => {
        flush();
        flushTimeout.current = null;
      }, 5000);
    }
  };

  // App state: flush on background
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'background') flush();
    });
    return () => sub.remove();
  }, []);

  // Auto screen tracking
  useEffect(() => {
    const unsubscribe = navRef.addListener?.('state', () => {
      const route = navRef.getCurrentRoute?.();
      if (route && route.name !== lastScreen.current) {
        lastScreen.current = route.name;
        queue('_screen', { name: route.name });
      }
    });
    return () => unsubscribe?.();
  }, [navRef]);

  // Error boundary for exceptions
  useEffect(() => {
    const handler = (error: any, isFatal?: boolean) => {
      queue('exception', { message: error?.message, fatal: isFatal });
    };
    // @ts-ignore
    if (global.ErrorUtils) global.ErrorUtils.setGlobalHandler(handler);
  }, []);

  // Context value
  const ctx: AnalyticsContextProps = {
    userId,
    setUser: (id) => { setUserId(id); Analytics.setUser(id); },
    setUserProps: (props) => Analytics.setUserProps(props),
    event: queue,
    screen: (name, props) => queue('_screen', { name, ...props }),
    ab,
  };

  return (
    <AnalyticsContext.Provider value={ctx}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return ctx;
}

// Usage:
// Wrap your app in <AnalyticsProvider> (in App.tsx)
// Use useAnalytics() in any component/module
// All events are batched, screen views are auto-tracked, errors are auto-captured
// For A/B: const variant = analytics.ab(userId, 'exp', ['A','B'])
