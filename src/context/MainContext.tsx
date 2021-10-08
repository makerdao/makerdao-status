import React, { createContext, useContext, useEffect, useState } from "react";
import { loadBase } from "../services";
import { Definitions } from "../types";
const MainContext = createContext<{ state: Definitions.StateType | null }>({ state: null });

function MainContextProvider({ ...props }) {
  const [state, setState] = useState<Definitions.StateType | null>();

  const loadData = async () => {
    const [baseData] = await Promise.all([loadBase()]);
    setState({
      ...baseData,
    } as any);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainContext.Provider
      value={{ state } as { state: Definitions.StateType }}
      {...props}
    />
  );
}

function useMainContext() {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }

  const state = context.state;
  return { state };
}

export { MainContextProvider, useMainContext };
