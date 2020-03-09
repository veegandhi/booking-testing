import React from "react";
import { connect } from "react-redux";

const Editor = ({ value, updateValue, updateKey }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <td>
      {isEditing ? (
        <input
          value={value}
          onChange={e => updateValue(e.target.value)}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <div className={updateKey} onClick={() => setIsEditing(true)}>{value}</div>
      )}
    </td>
  );
};
export { Editor as Component };
const ConnectedEditor = connect(
  null,
  (dispatch, ownProps) => ({
    updateValue: (value, key) =>
      dispatch({
        type: "UPDATE_BOOKING_VALUE",
        id: ownProps.id,
        value,
        key: ownProps.updateKey
      })
  })
)(Editor);

export default ConnectedEditor;
