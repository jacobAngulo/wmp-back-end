require("dotenv").config();
const server = require("./server");

const port = process.env.port || 3000;

server.listen(port, () => {
  console.log(`server up and running on localhost:${port}`);
});
