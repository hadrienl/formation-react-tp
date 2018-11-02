import React from 'react';

import { getAll } from '../../services/api';

import Loading from '../../components/Loading';

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

  render () {
    const { loading, items } = this.state;

    return loading
      ? (
        <Loading />
      ) : (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Titre</td>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
  }
}


export default List;
