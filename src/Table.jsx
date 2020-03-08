import React from "react";
import _ from "lodash";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { getSearchedBookingIds } from "./utils";
import Row from "./components/Row";

const DataTable = ({ bookings }) => {
  console.log("Table rendered");

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Select</th>
          <th>Id</th>
          <th>Name</th>
          <th>Seller Name</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(
          id => (
            <Row key={id} bookingId={id} />
          )
          // <tr key={booking.id}>
          //   <th scope="row">
          //     <Checkbox id={booking.id} />
          //   </th>
          //   <td>{booking.id.slice(0, 5)}</td>
          //   <td>{booking.product.name}</td>
          //   <td>{booking.product.seller.name}</td>
          //   {/* <td>{booking.quantity}</td> */}
          //   <Editor
          //     updateKey="quantity"
          //     id={booking.id}
          //     value={booking.quantity}
          //   />
          //   <td>{`$${(booking.quantity * booking.product.rate) / 100}`}</td>
          // </tr>
        )}
      </tbody>
    </Table>
  );
};

const ConnectedTable = connect(state => ({
  bookings: getSearchedBookingIds(state)
}))(React.memo(DataTable));
export default ConnectedTable;
