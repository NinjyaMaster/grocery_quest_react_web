import { createContext, useState, useMemo } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  const value = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
