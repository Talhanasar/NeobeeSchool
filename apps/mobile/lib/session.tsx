import { createContext, useContext, useMemo, useState } from 'react';

export type Role = 'teacher' | 'parent';

type SessionContextValue = {
  readonly role: Role | null;
  readonly signIn: (role: Role) => void;
  readonly signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { readonly children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);

  const value = useMemo<SessionContextValue>(
    () => ({
      role,
      signIn: (next: Role) => setRole(next),
      signOut: () => setRole(null),
    }),
    [role],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (ctx === null) {
    throw new Error('useSession must be used inside a <SessionProvider>.');
  }
  return ctx;
}
