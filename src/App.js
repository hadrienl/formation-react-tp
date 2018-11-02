import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainLayout from './layouts/Main';
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import Home from './views/Home';
import Demo from './views/Demo';

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
              <Home />
            </Route>
            <Route
              path="/demo"
              exact>
              <Demo />
            </Route>
          </Switch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

export default App;
