import React from "react";
import _ from 'lodash'
import {
  mountWithStore,
  createMockStore,
  populateMockStore
} from "../testUtils.jsx";
import SearchBar from "../SearchBar";

jest.spyOn(_, 'debounce').mockImplementation((f, delay) => {
  return f;
});


describe("Search Bar", () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
    populateMockStore(store);
  });

  it("should render Search Bar", () => {
    const wrapper = mountWithStore(<SearchBar />, store);
    expect(wrapper.find(SearchBar)).toHaveLength(1);
  });

  it("should correctly dispatch event with search text", () => {
    const spy = jest.spyOn(store, "dispatch");
    const wrapper = mountWithStore(<SearchBar />, store);
    wrapper.find("input").simulate("change", { target: { value: "foo" } });

    expect(spy).toBeCalledWith({
      text: "foo",
      type: "UPDATE_SEARCH_TEXT"
    });
  });

  it("should correctly dispatch event with instant prop", () => {
    const spy = jest.spyOn(store, "dispatch");
    const wrapper = mountWithStore(<SearchBar />, store);
    wrapper.find("input").prop("onChange")({ target: { value: "foo" } });

    expect(spy).toBeCalledWith({
      text: "foo",
      type: "UPDATE_SEARCH_TEXT"
    });
  });

  // it.only("should correctly dispatch event with search text", () => {
  //   // https://github.com/facebook/jest/issues/3465
  //   jest.useFakeTimers();
  //   const spy = jest.spyOn(store, "dispatch");
  //   const wrapper = mountWithStore(<SearchBar />, store);
  //   wrapper.find("input").prop("onChange")({ target: { value: "foo" } });

  //   jest.runAllTimers();

  //   expect(spy).toBeCalledWith({
  //     text: "foo",
  //     type: "UPDATE_SEARCH_TEXT"
  //   });
  // });

  // it.only("should correctly dispatch event with search text", () => {
  //   const spy = jest.spyOn(store, "dispatch");
  //   const wrapper = mountWithStore(<SearchBar />, store);
  //   wrapper.find("input").prop("onChange")({ target: { value: "foo" } });

  //   expect(spy).toBeCalledWith({
  //     text: "foo",
  //     type: "UPDATE_SEARCH_TEXT"
  //   });
  // });
});
