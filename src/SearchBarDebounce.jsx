import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getTotals } from "./utils";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  setSearchLocal = event => {
    const { value } = event.target;
    this.setState({ search: value });
    this.props.setSearchText(value);
  };
  render() {
    const { selectedTotal, totals } = this.props;
    return(
      <div className="search-bar">
        <div>
          <label>Selected Bookings</label> {selectedTotal}
        </div>
        <div className="selection-totals">
          <label>Total Selection Amount</label> ${totals}
        </div>
        <div>
          <label>Search Booking</label>
          <input
            type="text"
            value={this.state.search}
            onChange={this.setSearchLocal}
          />
        </div>
      </div>
    );
  }
}

const ConnectedSearchBar = connect(
  state => ({
    searchText: state.search,
    selectedTotal: state.selection.length,
    totals: getTotals(state)
  }),
  dispatch => ({
    setSearchText: _.debounce(
      text => dispatch({ type: "UPDATE_SEARCH_TEXT", text }),
      500
    )
  })
)(SearchBar);

export default ConnectedSearchBar;
