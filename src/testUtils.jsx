import React from "react";
import _ from "lodash";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";

export const populateMockStore = store => {
  store.state.data = {
    bookings: [],
    products: [],
    sellers: []
  };
  store.state.search = "";
  store.state.selection = [];
  store.state.updates = [];
};
export const createMockStore = () => {
  const store = {
    state: {},
    getState: () => store.state,
    subscribe: _.noop
  };

  const inner = { dispatch: _.noop };

  store.dispatch = action => {
    if (_.isFunction(action)) {
      return action(store.dispatch, store.getState);
    }

    return inner.dispatch(action);
  };

  return store;
};

export const mountWithStore = (component, store) =>
  mount(<Provider store={store}>{component}</Provider>);
