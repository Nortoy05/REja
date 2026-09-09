const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://nortoy:N2wKWZdellL0Kb2s@nortoy.ggqdwse.mongodb.net/Reja?appName=Nortoy";
mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(" ERROR on connection MongoDB:", err);
    } else {
      db = client.db();
      console.log("MongoDB connection succeed");
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = process.env.PORT || 3000;

      server.listen(PORT, function () {
        console.log(
          ` This server is running successfully on port ${PORT} , http://localhost:${PORT},`
        );
      });
    }
  }
);
