import React from 'react';

import { getAll, remove } from './api';

export const context = React.createContext();

const { Provider } = context;

export class ItemsProvider extends React.Component {
  getAll = async () => {
    try {
      const items = await getAll();
      this.setState({ items });
    } catch (error) {
      this.setState({ error });
    }
  }

  removeItem = async id => {
    const removingAttr = `removing${id}`;
    this.setState({ [removingAttr]: true });

    try {
      await remove(id);
    } catch (e) {
      this.setState({ removing: false });
      return;
    }

    const { items } = this.state;
    const newItems = [...items];
    const index = newItems.findIndex(({ id: itemId }) => itemId === id);

    if (index === -1) return;

    newItems.splice(index, 1);
    this.setState({ items: newItems, [removingAttr]: undefined });
  }

  state = {
    getAll: this.getAll,
    removeItem: this.removeItem,
    items: [],
    loading: false,
  };

  render () {
    const { children } = this.props;

    return (
      <Provider value={this.state}>{children}</Provider>
    );
  }
}

export default ItemsProvider;
