import React from 'react';
import renderer from 'react-test-renderer';
import MainLayout from './';

it('should render', () => {
  const tree = renderer.create(<MainLayout />).toJSON();
  expect(tree).toMatchSnapshot();
});
