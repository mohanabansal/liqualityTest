import React, { Component } from "react";
import { connect } from "react-redux";
import { getMarketInfoFromAPI } from "../../redux/MarketInfo";
import MarketInfoUI from "./MarketInfoUI";

class MarketInfo extends Component {
  constructor() {
    super();
    this.state = {
      timer: 5000,
    };
  }
  componentDidMount() {
    this.props.getMarketInfo();
    this.interval = setInterval(() => {
      this.props.getMarketInfo();
    }, this.state.timer);
  }

  componentWillUnmount() {
    console.log("unmount!!!");
    clearInterval(this.interval);
  }

  handleChange = async (e) => {
    let newTimer = parseInt(e.target.value) * 1000;
    await this.setState({
      timer: newTimer,
    });
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.props.getMarketInfo();
    }, this.state.timer);
  };

  stopFetching = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <div>
        <label>Refresh data every:</label>
        <select defaultValue="default" onChange={this.handleChange}>
          <option value="default" disabled>
            Select to set time
          </option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <MarketInfoUI info={this.props.info} />
        <button onClick={this.stopFetching}>Stop Fetching</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.marketInfo.info,
  freq: state.marketInfo.freq,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMarketInfo: () => {
      dispatch(getMarketInfoFromAPI());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketInfo);
