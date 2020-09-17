import React, { Component } from "react";
import { connect } from "react-redux";
import { getMarketInfoFromAPI } from "../../redux/MarketInfo";
import MarketInfoUI from "./MarketInfoUI";

class MarketInfo extends Component {
  componentDidMount() {
    this.props.getMarketInfo();
  }
  render() {
    return (
      <div>
        <MarketInfoUI info={this.props.info} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.marketInfo.info,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMarketInfo: () => {
      dispatch(getMarketInfoFromAPI());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketInfo);
