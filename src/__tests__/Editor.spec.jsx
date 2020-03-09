import React from "react";
import _ from "lodash";
import { shallow } from "enzyme";
import {
  mountWithStore,
  createMockStore,
  populateMockStore
} from "../testUtils.jsx";
import { Component as Editor } from "../components/Editor";

describe("Editor", () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
    populateMockStore(store);
  });

  it("should render Editor", () => {
    const wrapper = shallow(<Editor updateKey="foo"/>);
    expect(wrapper.find('.foo')).toHaveLength(1);
    wrapper.find('.foo').simulate('click');
    expect(wrapper.find('input')).toHaveLength(1);
  });
});
