

console.log("Web Serverni boshlash");
const express = require("express");
const app = express();

// MongoDB call
const db = require("./server").db();
const mongodb = require("mongodb");

//1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2: Session
//3: View code
app.set("views", "views");
app.set("view engine", "ejs");

//4: Routing code
app.get("/", function (req, res) {
  console.log("user entered /");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong");
      } else {
        res.render("reja", { items: data });
      }
    });
});

app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "insert failed" });
    }
    res.json(data.ops[0]);
  });
});

app.post("/delete-item", (req, res) => {
  const id = req.body.id;
  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectID(id) },
    function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "delete failed" });
      }
      res.json({ state: "success" });
    }
  );
});

app.post("/edit-item", (req, res) => {
  const data = req.body;
  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectID(data.id) },
    { $set: { reja: data.new_input } },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "update failed" });
      }
      res.json({ state: "success" });
    }
  );
});

app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany({}, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "delete-all failed" });
      }
      res.json({ state: "hamma rejalar ochirildi" });
    });
  } else {
    res.status(400).json({ error: "delete_all flag missing" });
  }
});

module.exports = app;

