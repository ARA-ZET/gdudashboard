'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null, loading: true,
  signIn: async () => {}, logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };
  const logout = async () => { await signOut(auth); };

  return <Ctx.Provider value={{ user, loading, signIn, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
