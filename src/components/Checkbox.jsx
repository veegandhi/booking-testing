import React from "react";
import { connect } from "react-redux";

const Checkbox = ({ checked, updateSelection }) => (
  <input type="checkbox" checked={checked} onChange={updateSelection} />
);

const ConnectedCheckbox = connect(
  (state, ownProps) => ({
    checked: state.selection.includes(ownProps.id)
  }),
  (dispatch, ownProps) => ({
    updateSelection: () =>
      dispatch({ type: "UPDATE_SELECTION", id: ownProps.id })
  })
)(Checkbox);

export default ConnectedCheckbox;
