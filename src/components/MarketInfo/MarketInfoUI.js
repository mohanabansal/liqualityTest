import React from "react";
import "./index.scss";

function MarketInfoUI(props) {
  const { info } = props;
  return (
    <div className="info-table">
      <table>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Rate</th>
        </tr>
        {info.map((item) => {
          return (
            <tr>
              <td>{item.from}</td>
              <td>{item.to}</td>
              <td>{item.rate}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default MarketInfoUI;
