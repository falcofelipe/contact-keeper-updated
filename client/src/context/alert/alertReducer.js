import { SET_ALERT, REMOVE_ALERT, REMOVE_ALERTS } from '../types';

const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    case REMOVE_ALERTS:
      return [];
    default:
      return state;
  }
};

export default alertReducer;
