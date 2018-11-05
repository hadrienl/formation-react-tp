import { getAll, remove } from '../api';
import { REQUEST_ALL_START, REQUEST_ALL_SUCCESS, REQUEST_ALL_FAILURE, REMOVE_ITEM } from './reducers';

export const getAllItems = () => async dispatch => {
  dispatch({ type: REQUEST_ALL_START });
  
  try {
    const items = await getAll();
    dispatch({
      type: REQUEST_ALL_SUCCESS,
      items,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ALL_FAILURE,
      error,
    });
  }
};

export const removeItem = id => {
  remove(id);

  return {
    type: REMOVE_ITEM,
    id,
  };
}
