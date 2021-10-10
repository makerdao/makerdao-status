import React from "react";
import { MainContextProvider } from "./context/MainContext";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { routes } from "./routes";
import { FontStyle, GlobalStyle } from "./components/styles";
import MainContainer from "./components/styledComponents/MainContainer";
import { SideBar } from "./components";
import { SideBarProvider } from "./context/SideBarComponentContext";

function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <FontStyle />
        <GlobalStyle />
        <SideBarProvider>
          <SideBar />
          <MainContainer>
            <Switch>
              {routes.map((item, i) => (
                <Route
                  exact
                  key={i}
                  path={item.path}
                  component={item.component}
                />
              ))}
              <Redirect from="*" to="/overview" />
            </Switch>
          </MainContainer>
        </SideBarProvider>
      </MainContextProvider>
    </BrowserRouter>
  );
}

export default App;
