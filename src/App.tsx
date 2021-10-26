import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { SideBar } from './components';
import MainContainer from './components/styledComponents/MainContainer';
import { ThemeProvider } from './components/styles';
import { MainContextProvider } from './context/MainContext';
import { SideBarProvider } from './context/SidebarContext';
import { routes } from './routes';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainContextProvider>
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
    </ThemeProvider>
  );
}

export default App;
