const express = require("express");
const app = express();
const socketio = require("socket.io");

const PORT = 5000;

app.get("/", (req, res) => {
});

const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`*****\nRarin ta go on http://localhost:${PORT}\n*****`)
  )

  const io = socketio(server)
  require('./client/src/socket')(io)
}

async function bootApp() {
  await startListening()
}

bootApp();
