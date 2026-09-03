console.log(`Web Serverni boshlash`);

const express = require("express");
const app = express();
const fs = require("fs");

// let user;
// fs.readFile(`database/user.json`, `utf8`, (err, data) => {
//   if (err) {
//     console.log(`ERROR: `, err);
//   } else {
//     user = JSON.parse(data);
//   }
// });

// MongoDB chaqirish
const db = require("./server").db();
const mongoDB = require("mongodb");

// 1Kirish code

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2 Session

app.set("views", "views");
app.set("view engine", "ejs");

//4Routing
// app.get("/hello", function(req,res){
//     res.end(`<h1>Hello World </h1>`);
// });
// app.get("/gift", function(req,res){
//     res.end(`<h1>Siz sovg'alar sahifasidasiz</h1>`);
// });
// app.get("/", function(req,res){
//     res.end(`<h1>Hello World </h1>`);
// });

app.post(`/create-item`, (req, res) => {
  console.log(`User entered /create-item`);
  console.log(req.body);
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    console.log(data.ops);
    res.json(data.ops[0]);
  });
});

app.post(`/delete-item`, (req, res) => {
  const id = req.body.id;
  db.collection(`plans`).deleteOne(
    { _id: new mongoDB.ObjectId(id) },
    function (err, data) {
      res.json({ state: "success" });
    },
  );
});

// app.get(`/author`, (req, res) => {
//   res.render(`author`, { user: user });
// });

app.get(`/`, function (req, res) {
  console.log(`User entered /`);
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong");
      } else {
        res.render(`reja`, { items: data });
      }
    });
});

module.exports = app;
