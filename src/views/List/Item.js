import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { remove } from '../../services/api';

export class Item extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    onRemove: PropTypes.func,
  };

  static defaultProps = {
    onRemove() {},
  };

  state = {};

  remove = async () => {
    const { id, onRemove } = this.props;

    this.setState({ removing: true });

    try {
      await remove(id);
      this.setState({ removing: false });
      onRemove(id);
    } catch (e) {
      this.setState({ removing: false });
    }
  }

  render () {
    const { id, title } = this.props;
    const { removing } = this.state;
    const { remove } = this;

    return (
      <tr>
        <td>{id}</td>
        <td>
          <NavLink
            to={`/edit/${id}`}>
            {title}
          </NavLink>
        </td>
        <td>
          <button 
            disabled={removing}
            type="button"
            onClick={remove}>Supprimer</button>
        </td>
      </tr>
    );
  }
}

export default Item;
