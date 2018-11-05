import React from 'react';

import { context } from '../../services/ItemsProvider';

import Loading from '../../components/Loading';
import Item from './Item';
export class List extends React.Component {
  static contextType = context;

  state = {
    items: [],
  };

  componentDidMount() {
    const { getAll } = this.context;
    getAll();
  }

  render () {
    console.log(this.context)
    const { loading, items } = this.context;

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
                {...item} />
            ))}
          </tbody>
        </table>
      )
  }
}


export default List;
