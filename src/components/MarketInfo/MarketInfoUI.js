import React from "react";
import { connect } from "react-redux";
import { setFrequecy } from "../../redux/MarketInfo";
import "./index.scss";

function MarketInfoUI(props) {
  const { info, setFreq } = props;

  const handleChange = (e) => {
    setFreq(e.target.value);
  };

  return (
    <div>
      <label>Refresh data every:</label>
      <input
        type="radio"
        id="5"
        name="freq"
        value="5"
        onChange={handleChange}
      />
      5 sec
      <input
        type="radio"
        id="10"
        name="freq"
        value="10"
        onChange={handleChange}
      />
      10 sec
      <input
        type="radio"
        id="15"
        name="freq"
        value="15"
        onChange={handleChange}
      />
      15 sec
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
    </div>
  );
}

const mapDispatchToProps = (disppatch) => ({
  setFreq: (freq) => {
    disppatch(setFrequecy(freq));
  },
});

export default connect(null, mapDispatchToProps)(MarketInfoUI);
