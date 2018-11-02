import React from 'react';
import renderer from 'react-test-renderer';
import List from './';

it('should render', () => {
  const tree = renderer.create(<List />).toJSON();
  expect(tree).toMatchSnapshot();
});
