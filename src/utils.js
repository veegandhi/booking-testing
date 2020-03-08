import { createSelector } from "reselect";
import _ from "lodash";

export const fetchData = path => {
  return fetch(`https://blooming-fortress-38880.herokuapp.com/${path}`).then(
    response => response.json()
  );
};

export const getBookingsData = state => state.data.bookings;
export const getProducts = state => state.data.products;
export const getSellers = state => state.data.sellers;
export const getSearchText = state => state.search;
export const getSelection = state => state.selection;
export const getUpdates = state => state.updates;

export const getBookings = createSelector(
  getBookingsData,
  getProducts,
  getSellers,
  (bookings, products, sellers) => {
    const result = bookings.map(booking => {
      booking.product = products.find(
        product => product.id === booking.productId
      );
      booking.product.seller = sellers.find(
        seller => booking.product.sellerId === seller.id
      );
      return booking;
    });

    console.log("bookings calculated");

    return result;
  }
);

export const getSearchedBookingIds = createSelector(
  getBookings,
  getSearchText,
  (bookings, searchText) =>
    _(bookings)
      .keyBy("id")
      .keys()
      .value()
);

// export const getSearchedBookings = createSelector(
//   getBookings,
//   getSearchText,
//   (bookings, searchText) => bookings.filter(booking => searchText === "" || booking.name.includes(searchText) )
// );

export const getBookingsByKey = createSelector(
  getBookings,
  bookings => _.keyBy(bookings, "id")
);

export const getTotals = createSelector(
  getBookingsByKey,
  getSelection,
  (bookings, selection) => {
    return (
      selection.reduce(
        (accumlator, id) =>
          bookings[id].quantity * bookings[id].product.rate + accumlator,
        0
      ) / 100
    );
  }
);

export const getBookingById = id =>
  createSelector(
    getBookings,
    getUpdates,
    (bookings, updates) => ({
      ...bookings.find(booking => booking.id === id),
      ...updates[id]
    })
  );
