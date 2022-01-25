import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadBase } from '../services';
import useLoadCollaterals from '../services/loadData/useLoadCollaterals';
import { useChangelogContext } from './ChangelogContext';

const initialState = {
  state: { collaterals: [] } as Definitions.BasicStateType,
  loading: false,
};
const MainContext = createContext<{
  state: Definitions.BasicStateType;
  loading?: boolean;
}>(initialState);

function MainContextProvider({ ...props }) {
  const {
    state: { changelog },
    loading: loadingChangelog,
  } = useChangelogContext();

  const [state, setState] = useState<Definitions.BasicStateType | undefined>(
    initialState.state,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { collaterals, loading: collLoading } = useLoadCollaterals();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [baseData] = await Promise.all([loadBase(changelog)]);

      setState({
        ...baseData,
        collaterals: [],
      });
      setLoading(false);
    };

    if (changelog) loadData();
  }, [changelog]);

  useEffect(() => {
    setState({
      ...state,
      collaterals,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collaterals]);

  return (
    <MainContext.Provider
      value={
        { state, loading: loading || collLoading || loadingChangelog } as {
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
