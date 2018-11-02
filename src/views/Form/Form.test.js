import React from 'react';
import renderer from 'react-test-renderer';
import { Form } from './';

it('should render', () => {
  const tree = renderer.create(<Form match={{ params: { id: '' }}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
