import React from "react";
import "./styles.css";
import { fetchData } from "./utils";
import Table from "./Table";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    Promise.all([
      fetchData("bookings"),
      fetchData("sellers"),
      fetchData("products")
    ]).then(response => {
      this.props.populateData({
        bookings: response[0].data,
        sellers: response[1].data,
        products: response[2].data
      });
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? (
          "Loading..."
        ) : (
          <>
            <SearchBar />
            <Table />
          </>
        )}
      </div>
    );
  }
}

export { App as Component };

const ConnectedApp = connect(
  null,
  disaptch => ({
    populateData: data => disaptch({ type: "LOAD_DATA", data })
  })
)(App);

export default ConnectedApp;
