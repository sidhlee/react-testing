require("dotenv").config();

const app = require("express")();
const cors = require("cors");
const fs = require("fs");

app.use(
  cors({
    origin: `http://localhost:${process.env.PORT}`,
    credentials: true
  })
);

app.listen(3030, () =>
  console.log(`random-word-server listening on port 3030`)
);

module.exports = app;
