const { default: Axios } = require("axios");

const axios = require("axios");

async function getData() {
  const {data} = axios.get("https://liquality.io/swap/agent/api/swap/marketinfo");
  return data;
}

module.exports = io => {
  console.log('IN SOCKET---------->')
  io.on('connection', socket => {
    console.log(`**********!!!!!A socket connection to the server has been made: ${socket.id}`)

    // setInterval(() => {
    //   this.props.getMarketInfo();
    // }, this.state.timer);

    socket.on("fetchData", (timer) => {
      console.log("-------FETCHING DATA--------", timer);
      setInterval(async() => {
        const {data} = await axios.get(
                  "https://liquality.io/swap/agent/api/swap/marketinfo"
                );
        console.log("Data", data)
        socket.emit("newInfo", data)
      }, timer)

    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    console.log('SOCKET DISCONNECTED!!!')
  })
}
