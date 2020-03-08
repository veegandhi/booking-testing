import React from "react";
import { connect } from "react-redux";
import { getTotals } from "./utils";

const SearchBar = ({ searchText, setSearchText, selectedTotal, totals }) => {
  return (
    <div className="search-bar">
      <div>
        <label>Selected Bookings</label> {selectedTotal}
      </div>
      <div>
        <label>Total Selection Amount</label> ${totals}
      </div>
      <div>
        <label>Search Booking</label>
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};

const ConnectedSearchBar = connect(
  state => ({
    searchText: state.search,
    selectedTotal: state.selection.length,
    totals: getTotals(state)
  }),
  dispatch => ({
    setSearchText: text => dispatch({ type: "UPDATE_SEARCH_TEXT", text })
  })
)(SearchBar);

export default ConnectedSearchBar;
