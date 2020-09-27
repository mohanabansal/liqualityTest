import React from "react";
import { connect } from "react-redux";
import { sortBy } from "../../redux/MarketInfo";

function Sort(props) {
  const handleSort = (e) => {
    props.sortBy(e.target.value);
  };

  return (
    <div>
      <label>Sort by:</label>
      <select onChange={handleSort}>
        <option selected disabled>
          None
        </option>
        <option value="from">From</option>
        <option value="to">To</option>
      </select>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sortByValue) => {
    dispatch(sortBy(sortByValue));
  },
});

export default connect(null, mapDispatchToProps)(Sort);
