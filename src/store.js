import { createStore, combineReducers } from "redux";

function data(state = {}, action) {
  switch (action.type) {
    case "LOAD_DATA":
      return action.data;
    // case "UPDATE_BOOKING_VALUE": {
    //   console.log(action);
    //   return {
    //     ...state,
    //     bookings: state.bookings.map(booking => {
    //       if (booking.id === action.id) {
    //         booking[action.key] = action.value;
    //         console.log(booking);
    //       }
    //       return booking;
    //     })
    //   };
    // }
    default:
      return state;
  }
}

function updates(state = {}, action) {
  switch (action.type) {
    case "UPDATE_BOOKING_VALUE": {
      return {
        ...state,
        [action.id]: { ...state[action.id], [action.key]: action.value }
      };
    }
    default:
      return state;
  }
}

function search(state = "", action) {
  switch (action.type) {
    case "UPDATE_SEARCH_TEXT":
      return action.text;
    default:
      return state;
  }
}

function selection(state = [], action) {
  switch (action.type) {
    case "UPDATE_SELECTION": {
      const newState = state.includes(action.id)
        ? state.filter(id => id !== action.id)
        : state.concat(action.id);
      return newState;
    }
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({ data, search, selection, updates })
);

export default store;
