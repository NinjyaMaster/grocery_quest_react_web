import { createContext, useState, useMemo } from 'react';
import secureLocalStorage from 'react-secure-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    authenticated: false,
    email: '',
    username: '',
  });

  const logout = () => {
    secureLocalStorage.clear();
    setAuthState({
      authenticated: false,
      email: '',
      username: '',
    });
  };

  const value = useMemo(
    () => ({
      authState,
      setAuthState,
      logout,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
