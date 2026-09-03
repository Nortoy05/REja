
// const http = require("http");
// const app = require("./app");

// const server = http.createServer(app);
// let PORT = 3000;
// server.listen(PORT, function () {
//   console.log(
//     `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`,
//   );
// });

const http = require("http");
const app = require("./app");

const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, function () {
  console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
});
