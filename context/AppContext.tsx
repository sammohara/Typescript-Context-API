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

type appContextType = {
  user: boolean;
  contextValue: Record<string, unknown>;
  login: () => void;
  logout: () => void;
};

type InitialValues = {
  clientId: number;
};

const appContextDefaultValues: appContextType = {
  user: null,
  contextValue: {},
  login: () => {},
  logout: () => {},
};

// Create Context
const AppContext = createContext<any>(initialState);

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
    console.log('1st useEffect');
    if (JSON.parse(localStorage.getItem('lealta-member-state'))) {
      dispatch({
        type: 'init_stored',
        value: JSON.parse(localStorage.getItem('lealta-member-state')),
      });
    }
  }, []);

  useEffect(() => {
    console.log('2nd Use effect.');
    if (state !== initialState) {
      localStorage.setItem('lealta-member-state', JSON.stringify(state));
    }
  }, [state]);

  const [user, setUser] = useState<boolean>(null);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
      {/* <AppContext.Provider value={value}>{children}</AppContext.Provider> */}
    </>
  );
}
