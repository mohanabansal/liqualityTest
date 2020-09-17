const express = require("express");
const app = express();

const port = 5000;

app.get("/", (req, res) => {
  const customer = [
    { id: 1, firstName: "Mohana", lastName: "Bansal" },
    { id: 2, firstName: "Sid", lastName: "Parikh " },
  ];
  res.json(customer);
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
