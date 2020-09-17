const { default: Axios } = require("axios");

const axios = require("axios");

async function getData() {
  const {data} = axios.get("https://liquality.io/swap/agent/api/swap/marketinfo");
  return data;
}

let interval;
module.exports = io => {
  io.on('connection', socket => {
    console.log(`**********!!!!!A socket connection to the server has been made: ${socket.id}`)

    socket.on("fetchData", (timer) => {
      clearInterval(interval);
      interval = setInterval(async() => {
        const {data} = await axios.get("https://liquality.io/swap/agent/api/swap/marketinfo");
        socket.emit("newInfo", data)
      }, timer)

    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    console.log('SOCKET DISCONNECTED!!!')
  })
}
