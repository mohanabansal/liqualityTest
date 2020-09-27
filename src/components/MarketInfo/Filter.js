import React from "react";
import { connect } from "react-redux";
import { fromFilter, toFilter } from "../../redux/MarketInfo";

function Filter(props) {
  const { fromOptions, toOptions } = props;

  const handleFromChange = (e) => {
    props.fromFilter(e.target.value);
  };

  const handleToChange = (e) => {
    props.toFilter(e.target.value);
  };

  return (
    <div>
      <div>
        <div>
          <label>From</label>
          <select onChange={handleFromChange}>
            <option selected value="all">
              All
            </option>
            {fromOptions &&
              fromOptions.map((option) => (
                <option value={option}>{option}</option>
              ))}
          </select>
        </div>
        <div>
          <label>To</label>
          <select onChange={handleToChange}>
            <option selected value="all">
              All
            </option>
            {toOptions.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  fromOptions: state.marketInfo.fromOptions,
  toOptions: state.marketInfo.toOptions,
});

const mapDispatchToProps = (dispatch) => ({
  fromFilter: (fromSelectedValue) => {
    dispatch(fromFilter(fromSelectedValue));
  },
  toFilter: (fromSelectedValue) => {
    dispatch(toFilter(fromSelectedValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
