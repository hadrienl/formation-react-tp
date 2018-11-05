import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { removeItem } from '../../services/store/actions';

export class Item extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
  };

  remove = async () => {
    const { id, removeItem } = this.props;
    removeItem(id);
  }

  render () {
    const { id, title } = this.props;
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
            type="button"
            onClick={remove}>Supprimer</button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeItem: id => dispatch(removeItem(id)),
});

export default connect(null, mapDispatchToProps)(Item);
