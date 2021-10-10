import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { MainContextProvider } from './context/MainContext';
import { routes } from './routes';
import { FontStyle, GlobalStyle } from './components/styles';
import MainContainer from './components/styledComponents/MainContainer';
import { SideBarProvider } from './context/SideBarContext';
import { SideBar } from './components';

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
      </MainContextProvider>
    </BrowserRouter>
  );
}

export default App;
