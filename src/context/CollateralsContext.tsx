import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { loadCollaterals } from '../services/loadCollaterals';

type State = {
  collaterals: Definitions.Collaterals;
  loading?: boolean;
};
const CollateralsContext = createContext<State>({
  collaterals: [],
  loading: false,
});

function CollateralsContextProvider({ ...props }) {
  const [collaterals, setCollaterals] = useState<Definitions.Collaterals>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadCollateralsCall = useCallback(async () => {
    setLoading(true);
    const collateralsLoaded = await loadCollaterals();
    setCollaterals(collateralsLoaded);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCollateralsCall();
  }, [loadCollateralsCall]);

  return (
    <CollateralsContext.Provider value={{ collaterals, loading }} {...props} />
  );
}

const useCollateralsContext = () => useContext(CollateralsContext);

export { CollateralsContextProvider, useCollateralsContext };
