import React, { Component } from "react";
import { connect } from "react-redux";

class FilterSort extends Component {
  constructor() {
    super();
    this.state = {
      from: [],
      to: [],
    };
  }
  render() {
    const { from, to } = this.props;
    console.log("TO", to)
    return (
      <div>
        <label>From</label>
        <select>
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
  }
}

const mapStateToProps = (state) => ({
  from: state.marketInfo.from,
  to: state.marketInfo.to,
});

export default connect(mapStateToProps, null)(FilterSort);
