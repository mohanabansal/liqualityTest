const express = require("express");
const app = express();
const socketio = require("socket.io");

const PORT = 5000;

app.get("/", (req, res) => {
});

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`*****\nRarin ta go on http://localhost:${PORT}\n*****`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./client/src/socket')(io)
}

// app.listen(port, () => {
//   console.log(`Server listening to port ${port}`);
// });
async function bootApp() {
  await startListening()
}

bootApp();
