import React, { Component } from 'react';

import MainLayout from './layouts/Main';
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import Home from './views/Home';

class App extends Component {
  render() {
    return (
      <MainLayout
        header={<MainHeader />}
        footer={<MainFooter />}>
        <Home />
      </MainLayout>
    );
  }
}

export default App;
