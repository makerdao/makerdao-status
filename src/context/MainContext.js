import React, { createContext, useContext, useEffect, useState } from "react";
import {loadBase} from '../services'
const MainContext = createContext();

function MainContextProvider({...props}) {
  const [state, setState] = useState(null);

  const loadData = async () => {
    
    const [baseData] = await Promise.all([
      loadBase(),
  
    ]);
  
    setState({
      ...baseData,
    });
  };

  
  useEffect(() => {
    loadData();
  }, []);

  return <MainContext.Provider value={{ state }} {...props} />;
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
