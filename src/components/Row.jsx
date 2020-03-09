import React from "react";
import { connect } from "react-redux";
import { getBookingById } from "../utils";
import Checkbox from "./Checkbox";
import Editor from "./Editor";

const Row = ({ id, product, quantity }) =>
  console.log(id) || (
    <tr key={id}>
      <th scope="row">
        <Checkbox id={id} />
      </th>
      <td className="id">{id.slice(0, 5)}</td>
      <td className="name">{product.name}</td>
      <td className="seller">{product.seller.name}</td>
      <Editor updateKey="quantity" id={id} value={quantity} />
      <td className="row-total">{`$${(quantity * product.rate) / 100}`}</td>
    </tr>
  );

export { Row as Component };

const makeGetBookingsById = (state, ownProps) => {
  const memoizedSelectorById = getBookingById(ownProps.bookingId);

  return memoizedSelectorById(state);
};
const ConnectedRow = connect(makeGetBookingsById)(Row);

export default ConnectedRow;
