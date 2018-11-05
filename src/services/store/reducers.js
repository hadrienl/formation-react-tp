export const REQUEST_ALL_START = 'REQUEST_ALL_START';
export const REQUEST_ALL_SUCCESS = 'REQUEST_ALL_SUCCESS';
export const REQUEST_ALL_FAILURE = 'REQUEST_ALL_FAILURE';
export const REMOVE_ITEM = 'REMOVE_ITEM';

const initialState = {
  items: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ALL_START:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_ALL_SUCCESS:
      return {
        ...state,
        items: action.items,
        loading: false,
      };
    case REQUEST_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REMOVE_ITEM: {
      const newItems = [...state.items];
      const index = newItems.findIndex(({ id }) => id === action.id);
      if (index > -1) {
        newItems.splice(index, 1);
      }
      return {
        ...state,
        items: newItems,
      };
    }
    default:
      return state;
  }
}
