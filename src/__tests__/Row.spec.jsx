import React from "react";
import _ from "lodash";
import { shallow } from "enzyme";
import {
  createMockStore,
  populateMockStore,
  mountWithStore
} from "../testUtils.jsx";
import { Component as Row } from "../components/Row";

describe("Row", () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
    store.state.selection = ["booking-1"];
    store.state.data = {
      bookings: [
        {
          quantity: 125000,
          startDate: "2020-03-02T23:59:59.999Z",
          endDate: "2020-03-16T00:00:00.000Z",
          productId: "product-1",
          name: "Handcrafted channels",
          id: "booking-1"
        }
      ],
      products: [
        {
          rate: 1400,
          sellerId: "seller-1",
          name: "Medium Desktop Run of Section ATF Interstitial",
          id: "product-1"
        }
      ],
      sellers: [
        {
          id: "seller-1",
          name: "Kertzmann, Hodkiewicz and Koch"
        }
      ]
    };
    populateMockStore(store);
  });

  it("should render Row", () => {
    const wrapper = shallow(
      <Row
        id="booking-1"
        product={{
          rate: 1400,
          sellerId: "seller-1",
          name: "Medium Desktop Run of Section ATF Interstitial",
          id: "product-1",
          seller: {
            id: "seller-1",
            name: "Kertzmann, Hodkiewicz and Koch"
          }
        }}
        quantity={2000}
      />
    );
    // console.log(wrapper.debug())
    expect(wrapper.find(".id")).toHaveLength(1);
  });
  
  it("should render Row", () => {
    const wrapper = mountWithStore(
      <Row
        id="booking-1"
        product={{
          rate: 1400,
          sellerId: "seller-1",
          name: "Medium Desktop Run of Section ATF Interstitial",
          id: "product-1",
          seller: {
            id: "seller-1",
            name: "Kertzmann, Hodkiewicz and Koch"
          }
        }}
        quantity={2000}
      />,
      store
    );
    console.log(wrapper.debug());
    expect(wrapper.find('Row').debug()).toMatchSnapshot();
  });
});
