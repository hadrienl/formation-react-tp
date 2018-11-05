import React from 'react';
import { connect } from 'react-redux';

import { getAllItems } from '../../services/store/actions';

import Loading from '../../components/Loading';
import Item from './Item';
export class List extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render () {
    const { loading, items } = this.props;
    const { onRemove } = this;
    return (loading && !items.length)
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

const mapStateToProps = state => ({
  items: state.items,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(getAllItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
