import React from 'react';
import { NavLink } from 'react-router-dom';

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
            {items.map(({ id, title }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  <NavLink
                    to={`/edit/${id}`}>
                    {title}
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
  }
}


export default List;
