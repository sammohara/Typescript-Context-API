import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
  useState,
  // useMemo,
} from 'react';
import { AppReducer, initialState } from './AppReducer';

type appContextType = {
  user: boolean;
  contextValue: Record<string, unknown>;
  login: () => void;
  logout: () => void;
};

const appContextDefaultValues: appContextType = {
  user: null,
  contextValue: {},
  login: () => {},
  logout: () => {},
};

// Create Context
const AppContext = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  // const [appState, setAppState] = useState({});

  const { state, dispatch }: any = useReducer(AppReducer, initialState);
  console.log('State: ', state, 'Dispatch: ', dispatch);

  const [user, setUser] = useState<boolean>(null);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
  };

  const value = {
    user,
    login,
    contextValue,
    logout,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
      {/* <AppContext.Provider value={value}>{children}</AppContext.Provider> */}
    </>
  );
}
