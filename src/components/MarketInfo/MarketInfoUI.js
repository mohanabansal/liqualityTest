import React, { useState, useEffect } from "react";
import "./index.scss";

function MarketInfoUI(props) {
  const { info } = props;

  // const [fetching, setFetching] = useState(true);

  // useEffect(() => {
  //   console.log("On UI mount", fetching);
  //   const timer = setTimeout(() => {
  //     console.log("This will run after 1 second!");
  //     setFetching(false);
  //     console.log("After FETCHING", fetching);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div>
      {console.log("UI Updated")}
      {/* {console.log("DISPLAY FETCHING", fetching)}
      {fetching && <p>Updating!!!</p>} */}
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
                <td>{item.status}</td>
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
