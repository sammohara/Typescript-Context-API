import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  // useMemo,
} from 'react';

type appContextType = {
  user: boolean;
  login: () => void;
  logout: () => void;
};

const appContextDefaultValues: appContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

// Create Context
const AppContext = createContext<appContextType>(appContextDefaultValues);

export function useAppContext() {
  return useContext(AppContext);
}

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [appState, setAppState] = useState({});

  const [user, setUser] = useState<boolean>(null);

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}
