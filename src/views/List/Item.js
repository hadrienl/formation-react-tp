import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { context } from '../../services/ItemsProvider';

export class Item extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
  };

  static contextType = context;

  remove = async () => {
    const { id } = this.props;
    const { removeItem } = this.context;
    removeItem(id);
  }

  render () {
    const { id, title } = this.props;
    const removing = this.context[`removing${id}`];
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
