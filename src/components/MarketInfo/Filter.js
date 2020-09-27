import React from "react";
// import { connect } from "react-redux";

function Filter(props) {
  const { info } = props;
  return (
    <div>
      {info && info.length && (
        <div>
          <label>From</label>
          <select>
            <option selected>All</option>
            {info.map((item) => (
              <option value={item.from}>{item.from}</option>
            ))}
          </select>
          <label>To</label>
          <select>
            <option selected>All</option>
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

export default Filter;
