import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadBase } from '../services';
import { loadCollaterals } from '../services/loadCollaterals';

const initialState = { state: {} as Definitions.BasicStateType, loading: false };
const MainContext = createContext<{
  state: Definitions.BasicStateType;
  loading?: boolean;
}>(initialState);

function MainContextProvider({ ...props }) {
  const [state, setState] = useState<Definitions.BasicStateType | undefined>(
    initialState.state,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    const [baseData, collaterals] = await Promise.all([
      loadBase(),
      loadCollaterals(),
    ]);
    setState({
      ...baseData,
      collaterals,
    });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainContext.Provider
      value={
        { state, loading } as {
          state: Definitions.BasicStateType;
          loading?: boolean;
        }
      }
      {...props}
    />
  );
}

function useMainContext() {
  const { state, loading } = useContext(MainContext);

  return { state, loading };
}

export { MainContextProvider, useMainContext };
