import React from "react";
import { connect } from "react-redux";
import { filterFrom } from "../../redux/MarketInfo";

function FilterSort(props) {
  // render() {

  const handleFromChange = (e) => {
    props.filterFrom(e.target.value);
  };

  const { from, to } = props;

  return (
    <div>
      <label>From</label>
      <select onChange={handleFromChange}>
        <option value="all">All</option>
        {from.map((item) => {
          return (
            <option name={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <label>To</label>
      <select>
        <option value="all">All</option>
        {to.map((item) => {
          return (
            <option name={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
  // }
}

const mapStateToProps = (state) => ({
  from: state.marketInfo.from,
  to: state.marketInfo.to,
});

const mapDispatchToProps = (dispatch) => ({
  filterFrom: (value) => filterFrom(value),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSort);
