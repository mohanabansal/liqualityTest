import React from "react";
import { connect } from "react-redux";
import { fromFilter, toFilter } from "../../redux/MarketInfo";

function Filter(props) {
  const { info } = props;

  const handleFromChange = (e) => {
    props.fromFilter(e.target.value);
  };

  const handleToChange = (e) => {
    props.toFilter(e.target.value);
  };

  return (
    <div>
      {info && info.length && (
        <div>
          <label>From</label>
          <select onChange={handleFromChange}>
            <option selected value="all">
              All
            </option>
            {info.map((item) => (
              <option value={item.from}>{item.from}</option>
            ))}
          </select>
          <label>To</label>
          <select onChange={handleToChange}>
            <option selected value="all">
              All
            </option>
            {info.map((item) => (
              <option value={item.to}>{item.to}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   info: state.marketInfo.info,
// });

const mapDispatchToProps = (dispatch) => ({
  fromFilter: (fromSelectedValue) => {
    dispatch(fromFilter(fromSelectedValue));
  },
  toFilter: (fromSelectedValue) => {
    dispatch(toFilter(fromSelectedValue));
  },
});

export default connect(null, mapDispatchToProps)(Filter);
