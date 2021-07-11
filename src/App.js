import React from "react";
import { MainContextProvider } from "./context/MainContext";
import { OverviewData } from "./components";

function App() {
  return (
    <MainContextProvider>
      <OverviewData />
    </MainContextProvider>
  );
}

export default App;
