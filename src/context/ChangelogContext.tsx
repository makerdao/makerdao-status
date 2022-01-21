import React, { createContext, useContext, useEffect, useState } from 'react';
import useChangelog from '../services/addresses/useChangelog';

const initialState = {
  state: {} as Definitions.ChangelogState,
  loading: false,
};
const ChangelogContext = createContext<{
  state: Definitions.ChangelogState;
  loading?: boolean;
}>(initialState);

function ChangelogContextProvider({ ...props }) {
  const { data: changelog, loading } = useChangelog();
  const [state, setState] = useState<Definitions.ChangelogState | undefined>(
    initialState.state,
  );

  useEffect(() => {
    if (changelog) {
      setState({
        changelog,
      });
    }
  }, [changelog]);

  return (
    <ChangelogContext.Provider
      value={
        { state, loading } as {
          state: Definitions.ChangelogState;
          loading?: boolean;
        }
      }
      {...props}
    />
  );
}

function useChangelogContext() {
  const { state, loading } = useContext(ChangelogContext);

  return { state, loading };
}

export { ChangelogContextProvider, useChangelogContext };
