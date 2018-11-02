import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

export const MainHeader = () => (
  <div className="main-header">
    <h1>Formation React</h1>
    <nav className="main-header__nav">
      <NavLink to="/" exact>Home</NavLink>
      <NavLink to="/demo" exact>Demo</NavLink>
    </nav>
  </div>
);

export default MainHeader;
