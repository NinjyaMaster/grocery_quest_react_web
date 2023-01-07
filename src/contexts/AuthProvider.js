import { createContext, useState, useMemo } from 'react';
// secureLocalStorage fails in test. I use local storage only for test
import secureLocalStorage from 'react-secure-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    authenticated: false,
    email: '',
    username: '',
  });

  const logout = () => {
    // secureLocalStorage fails in test. I use local storage only for test
    secureLocalStorage.clear();
    // localStorage.clear();
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
