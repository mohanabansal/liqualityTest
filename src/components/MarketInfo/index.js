import React, { Component } from "react";
import { connect } from "react-redux";
import { getMarketInfoFromAPI } from "../../redux/MarketInfo";
import MarketInfoUI from "./MarketInfoUI";
import "./index.scss";

class MarketInfo extends Component {
  constructor() {
    super();
    this.state = {
      timer: 5000,
      fetching: false,
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

  handleTimeOut = () => {
    this.setState({
      fetching: false,
    });
  };

  handleChange = async (e) => {
    let newTimer = parseInt(e.target.value) * 1000;

    await this.setState({
      timer: newTimer,
    });

    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.setState({
        fetching: true,
      });
      setTimeout(() => this.handleTimeOut(), 1000);
      this.props.getMarketInfo();
    }, this.state.timer);
  };

  stopFetching = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <div className="info">
        <div className="timer-section">
          <div className="timer-header">
            <label>Refresh data every:</label>
            <select defaultValue="default" onChange={this.handleChange}>
              {/* <option value="default" disabled>
            Select to set time
          </option> */}
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          {this.state.fetching === true ? (
            <p>Updating...</p>
          ) : (
            <p>Updated...</p>
          )}
          <button onClick={this.stopFetching}>Stop Fetching</button>
          {/* <label>Stop Fetching</label>
          <label>
            <input type="checkbox"></input>
            <span class="slider round"></span>
          </label> */}
        </div>
        <MarketInfoUI info={this.props.info} />
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
