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
      this.setState({
        fetching: true,
      });
      setTimeout(() => this.handleTimeOut(), 2000);
      this.props.getMarketInfo();
    }, this.state.timer);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleTimeOut = () => {
    this.setState({
      fetching: false,
    });
  };

  handleChange = async (e) => {
    if (e.target.value === "stop") {
      clearInterval(this.interval);
    } else {
      let newTimer = parseInt(e.target.value) * 1000;

      await this.setState({
        timer: newTimer,
      });

      clearInterval(this.interval);

      this.interval = setInterval(() => {
        this.setState({
          fetching: true,
        });
        setTimeout(() => this.handleTimeOut(), 2000);
        this.props.getMarketInfo();
      }, this.state.timer);
    }
  };

  stopFetching = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <div className="info">
        <div className="timer-section">
          {this.state.fetching === true ? (
            <p className="status-updating">Updating...</p>
          ) : (
            <p className="status-updated">Updated</p>
          )}
          <div className="timer-header">
            <div className="refresh">
              <label>Refresh</label>
              <select defaultValue="default" onChange={this.handleChange}>
                <option value="5">5 sec</option>
                <option value="10">10 sec</option>
                <option value="15">15 sec</option>
                <option value="stop">Stop</option>
              </select>
            </div>
          </div>
        </div>
        <MarketInfoUI info={this.props.info} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.marketInfo.filteredInfo,
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
