import React from "react";
import "./index.scss";

function MarketInfoUI(props) {
  const { info } = props;
  return (
    <div>
      <div className="info-table">
        <table>
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
          {info.map((item) => {
            return (
              <tr>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.rate}</td>
                <td>{item.orderExpiresIn}</td>
                <td className={item.status.toLowerCase()}>{item.status}</td>
                <td>{item.max}</td>
                <td>{item.min}</td>
                <td>{item.minConf}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default MarketInfoUI;
