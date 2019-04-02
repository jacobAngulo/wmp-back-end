const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const UsersRouter = require("./routes/users");

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.use("/api/users", UsersRouter);

server.get("/", (req, res) => {
  res.send("welcom to /");
});

module.exports = server;
