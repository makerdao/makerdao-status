import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadBase, loadCats, loadFlips } from '../services';
import loadCollaterals from '../services/loadCollaterals';

const initialState = {
  state: {} as Definitions.BasicStateType,
  loading: false,
};
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
    const [baseData, collaterals, cats, flips] = await Promise.all([
      loadBase(),
      loadCollaterals(),
      loadCats(),
      loadFlips(),
    ]);

    const fullCollaterals = (collaterals || []).map((coll) => {
      const catItems = (cats || []).find(
        (catItem) => catItem.asset === coll.asset,
      );
      const flipItems = (flips || []).find(
        (flipsItem) => flipsItem.asset === coll.asset,
      );
      return {
        ...coll,
        catItems,
        flipItems,
      };
    });

    setState({
      ...baseData,
      collaterals,
      fullCollaterals,
      cats,
      flips,
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
