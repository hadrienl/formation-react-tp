import React from 'react';

import './styles.scss';

export const MainLayout = ({ header, children, footer }) => (
  <div className="main">
    {header &&
      <header className="main__header">{header}</header>
    }
    {children &&
      <div className="main__content">{children}</div>
    }
    {footer &&
      <footer className="main__footer">{footer}</footer>
    }
  </div>
);

export default MainLayout;
