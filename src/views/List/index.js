import React from 'react';

import { getAll } from '../../services/api';

import Loading from '../../components/Loading';
import Item from './Item';
export class List extends React.Component {
  state = {
    items: [],
  };

  async componentDidMount() {
    try {
      const items = await getAll();
      this.setState({ items });
    } catch (e) {}
  }

  onRemove = id => {
    const { items } = this.state;
    const newItems = [...items];
    const index = newItems.findIndex(({ id: itemId }) => itemId === id);
    if (index === -1) return;
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  }

  render () {
    const { loading, items } = this.state;
    const { onRemove } = this;
    return loading
      ? (
        <Loading />
      ) : (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Titre</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <Item
                key={item.id}
                {...item}
                onRemove={onRemove} />
            ))}
          </tbody>
        </table>
      )
  }
}


export default List;
