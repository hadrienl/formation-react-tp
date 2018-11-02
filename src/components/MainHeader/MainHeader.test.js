import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import MainHeader from './';

it('should render', () => {
  const tree = renderer.create(<BrowserRouter><MainHeader /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
