import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { UserProfile } from '@/types';
import { AuthContext, type AuthContextValue } from './AuthContext';

/**
 * AuthProvider — wires Supabase email/password auth into React context.
 *
 * The hook is auth-library agnostic from the consumer's perspective: it
 * exposes `user`, `profile`, `signIn`, `signUp`, `signOut`, and `loading`.
 * Swapping the backend later only changes this file.
 *
 * Email confirmation stays off (per project convention), so signUp yields
 * a usable session immediately.
 */

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Bootstrap: read the current session, then subscribe to changes.
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    // onAuthStateChange fires for SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Load the profile row whenever the user changes.
  const user: User | null = session?.user ?? null;

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    let active = true;

    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        if (data) setProfile(data as unknown as UserProfile);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      session,
      loading,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
    }),
    [user, profile, session, loading, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
