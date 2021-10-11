import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { MainContextProvider } from './context/MainContext';
import { CollateralsContextProvider } from './context/CollateralsContext';
import { routes } from './routes';
import { FontStyle, GlobalStyle } from './components/styles';
import MainContainer from './components/styledComponents/MainContainer';
import { SideBar } from './components';
import { SideBarProvider } from './context/SidebarContext';

function App() {
  return (
    <BrowserRouter>
      <MainContextProvider>
        <CollateralsContextProvider>
          <FontStyle />
          <GlobalStyle />
          <SideBarProvider>
            <SideBar />
            <MainContainer>
              <Switch>
                {routes.map((item) => (
                  <Route
                    exact
                    key={Math.random()}
                    path={item.path}
                    component={item.component}
                  />
                ))}
                <Redirect from="*" to="/overview" />
              </Switch>
            </MainContainer>
          </SideBarProvider>
        </CollateralsContextProvider>
      </MainContextProvider>
    </BrowserRouter>
  );
}

export default App;
