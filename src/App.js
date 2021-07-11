import React from "react";
import { MainContextProvider } from "./context/MainContext";
import { OverviewPage } from "./pages";

function App() {
  return (
    <MainContextProvider>
      <OverviewPage />
    </MainContextProvider>
  );
}

export default App;
