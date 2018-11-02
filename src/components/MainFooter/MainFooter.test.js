import React from 'react';
import renderer from 'react-test-renderer';
import MainFooter from './';

it('should render', () => {
  const tree = renderer.create(<MainFooter />).toJSON();
  expect(tree).toMatchSnapshot();
});
