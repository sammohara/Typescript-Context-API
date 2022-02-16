import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
  useState,
  // useMemo,
} from 'react';
import { AppReducer, initialState } from './AppReducer';

type InitialStateType = {
  state: any;
  dispatch: React.Dispatch<any>;
};

type appContextType = {
  user: boolean;
  contextValue: InitialStateType;
  login: () => void;
  logout: () => void;
};

const appContextDefaultValues: appContextType = {
  user: null,
  contextValue: {
    state: null,
    dispatch: null,
  },
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
  // const [appState, setAppState] = useState({});

  const [state, dispatch] = useReducer(AppReducer, initialState);
  // console.log('Context || State: ', state, 'Dispatch: ', dispatch);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('lealta-member-state'))) {
      dispatch({
        type: 'init_stored',
        value: JSON.parse(localStorage.getItem('lealta-member-state')),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('lealta-member-state', JSON.stringify(state));
    }
  }, [state]);

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
    contextValue,
    login,
    logout,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
      {/* <AppContext.Provider value={value}>{children}</AppContext.Provider> */}
    </>
  );
}
