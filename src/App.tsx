import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { MainWrapper, ScrollToTop, SideBar, ThemeProvider } from './components';
import { ChangelogContextProvider } from './context/ChangelogContext';
import { MainContextProvider } from './context/MainContext';
import { SideBarProvider } from './context/SidebarContext';
import { routes } from './routes';
import { CollateralSpellsContainerPage } from './pages';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Number.POSITIVE_INFINITY,
      staleTime: Number.POSITIVE_INFINITY,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ChangelogContextProvider>
            <MainContextProvider>
              <SideBarProvider>
                <SideBar />
                <MainWrapper>
                  <Switch>
                    {routes.map((item) => (
                      <Route
                        exact
                        key={Math.random()}
                        path={item.path}
                        component={item.component}
                      />
                    ))}
                    <Route
                      exact
                      path="/collateral-spells"
                      component={CollateralSpellsContainerPage}
                    />
                    <Redirect from="/" exact to="/overview" />
                    <Redirect from="*" exact to="/not-found-page" />
                  </Switch>
                </MainWrapper>
              </SideBarProvider>
            </MainContextProvider>
          </ChangelogContextProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
