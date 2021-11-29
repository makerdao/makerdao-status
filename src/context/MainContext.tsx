import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadBase, loadCats, loadFlips } from '../services';
import loadCollaterals, {
  useLoadCollaterals,
} from '../services/loadData/loadCollaterals';

const initialState = {
  state: {} as Definitions.BasicStateType,
  loading: false,
};
const MainContext = createContext<{
  state: Definitions.BasicStateType;
  loading?: boolean;
}>(initialState);

type Collaterals = Definitions.Collateral;

function MainContextProvider({ ...props }) {
  const { ilkSnapshot, loading: loadingCollaterals } = useLoadCollaterals();
  const [state, setState] = useState<Definitions.BasicStateType | undefined>(
    initialState.state,
  );
  const [collaterals, setCollaterals] = useState<Collaterals[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const newCollaterals = Array.from(ilkSnapshot.values()).map(
      (arr) => arr[0],
    );
    setCollaterals(newCollaterals);
  }, [ilkSnapshot]);

  const loadData = async () => {
    setLoading(true);
    const [baseData, loadedCollaterals] = await Promise.all([
      loadBase(),
      loadCollaterals(),
      loadCats(),
      loadFlips(),
    ]);

    setState({
      ...baseData,
      collaterals: [],
      loadedCollaterals,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const collateralsMapped = (collaterals || []).map((coll) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { loadedCollaterals } = state as any;
    const curr = ((loadedCollaterals || []) as Collaterals[]).find(
      (f) => f.asset === coll.asset,
    );
    return {
      ...coll,
      locked: curr?.locked || 0,
      lockedBN: curr?.lockedBN,
    };
  }, []);

  return (
    <MainContext.Provider
      value={
        {
          state: { ...state, collaterals: collateralsMapped },
          loading: loading || loadingCollaterals,
        } as {
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
