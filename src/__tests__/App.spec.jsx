import React from "react";
import _ from "lodash";
import {
  mountWithStore,
  createMockStore,
  populateMockStore
} from "../testUtils.jsx";
import App, { Component } from "../App";
import Row from "../components/Row";

describe("Intergration Test", () => {
  let store;
  let mockSpy;

  beforeEach(() => {
    store = createMockStore();
    populateMockStore(store);
  });

  it("should call componentDidMount", () => {
    const spy = jest.spyOn(Component.prototype, "componentDidMount");
    mountWithStore(<App />, store);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should render application", () => {
    store.state.selection = ['booking-1'];
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

    const wrapper = mountWithStore(<App />, store);
    const Table = wrapper.find(Component);

    // set state
    Table.setState({ isLoading: false });

    //Row
    const RenderedRow = wrapper.find(Row);
    expect(RenderedRow).toHaveLength(1);
    expect(RenderedRow.find(".id").text()).toEqual("booki");
    expect(RenderedRow.find(".name").text()).toEqual(
      store.state.data.products[0].name
    );
    expect(RenderedRow.find(".seller").text()).toEqual(
      store.state.data.sellers[0].name
    );
    expect(RenderedRow.find(".quantity").text()).toEqual(
      store.state.data.bookings[0].quantity.toString()
    );
    expect(RenderedRow.find(".row-total").text()).toEqual("$1750000");
    
    // Totals
    expect(wrapper.find(".selection-totals").text()).toEqual("Total Selection Amount $1750000");
  });
});
