import React, { Component } from "react";
import Filter from "./Filter";
import Sort from "./Sort";
import "./index.scss";

class MarketInfoUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  updateData = async () => {
    await this.setState({
      data: [...this.props.info],
    });
  };
  componentDidMount() {
    this.updateData();
  }

  render() {
    const { info } = this.props;
    // console.log("this.state", this.state.data);
    return (
      <div>
        <div className="filter-sort">
          <Filter />
          <Sort />
        </div>
        {info.length ? (
          <div className="info-table">
            <table>
              <tbody>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Rate</th>
                  <th>Order Expires In</th>
                  <th>Status</th>
                  <th>Max</th>
                  <th>Min</th>
                  <th>Min Conf</th>
                </tr>
                {info.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{item.from}</td>
                      <td>{item.to}</td>
                      <td>{item.rate}</td>
                      <td>{item.orderExpiresIn}</td>
                      <td className={item.status.toLowerCase()}>
                        {item.status}
                      </td>
                      <td>{item.max}</td>
                      <td>{item.min}</td>
                      <td>{item.minConf}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="no-data">No data for selected value</h2>
        )}
      </div>
    );
  }
}

export default MarketInfoUI;
