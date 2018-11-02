import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import List from './';
import { getAll } from '../../services/api';

jest.mock('../../services/api', () => ({
  getAll: jest.fn(() => []),
}));

it('should render', () => {
  const tree = renderer.create(<List />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should load all items on mount', () => {
  shallow(<List />);
  expect(getAll).toHaveBeenCalled();
})

it('should list items', () => {
  const wrapper = shallow(<List />);
  const items = [{id: 1}, {id: 2}, {id: 3}];
  wrapper.setState({ items });
  expect(wrapper.find('Item').length).toBe(3)
})


it('should remove item', () => {
  const wrapper = shallow(<List />);
  const items = [{id: 1}, {id: 2}, {id: 3}];
  wrapper.setState({ items });
  wrapper.instance().onRemove(2);
  expect(wrapper.state().items.length).toBe(2);
  expect(wrapper.state().items[0].id).toBe(1);
  expect(wrapper.state().items[1].id).toBe(3);
})
