import React, { Component } from "react";
import { connect } from "react-redux";
import { getMarketInfoFromAPI } from "../../redux/MarketInfo";

class MarketInfo extends Component {
  componentDidMount() {
    this.props.getMarketInfo();
  }
  render() {
    return <div></div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMarketInfo: () => {
      dispatch(getMarketInfoFromAPI());
    },
  };
};

export default connect(null, mapDispatchToProps)(MarketInfo);
