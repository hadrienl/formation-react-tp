import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainLayout from './layouts/Main';
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import Loading from './components/Loading';

const Home = lazy(() => import('./views/Home'))
const Form = lazy(() => import('./views/Form'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainLayout
          header={<MainHeader />}
          footer={<MainFooter />}>
          <Switch>
            <Route
              path="/"
              exact>
              <Suspense
                fallback={<Loading />}>
                <Home />
              </Suspense>
            </Route>
            <Route
              path="/form"
              exact>
              <Suspense
                fallback={<Loading />}>
                <Form />
              </Suspense>
            </Route>
          </Switch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

export default App;
