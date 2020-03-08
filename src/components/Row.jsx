import React from "react";
import { connect } from "react-redux";
import { getBookingById } from "../utils";
import Checkbox from "./Checkbox";
import Editor from "./Editor";

const Row = ({ id, product, quantity }) =>
  console.log("rowRendered") || (
    <tr key={id}>
      <th scope="row">
        <Checkbox id={id} />
      </th>
      <td>{id.slice(0, 5)}</td>
      <td>{product.name} test 1</td>
      <td>{product.seller.name}</td>
      {/* <td>{quantity}</td> */}
      <Editor updateKey="quantity" id={id} value={quantity} />
      <td>{`$${(quantity * product.rate) / 100}`}</td>
    </tr>
  );

const makeGetBookingsById = (state, ownProps) => {
  const memoizedSelectorById = getBookingById(ownProps.bookingId);

  return memoizedSelectorById(state);
};
const ConnectedRow = connect(makeGetBookingsById)(Row);

export default ConnectedRow;
