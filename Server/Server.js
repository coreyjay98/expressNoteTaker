const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const Note = require("./Note");
const db = require("../db/db.json");
const { postData } = require("./write");
const { searchAndDelete } = require("./write");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static("../public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile("../db/db.json", function (err, data) {
    if (err) console.log(err);
    let stored = JSON.parse(data);
    res.send(stored);
  });
});

app.post("/api/notes", function (req, res) {
  postData(req);
  res.json(db);
});

app.delete("/api/notes/:id", function (req, res) {
  searchAndDelete(req.params);
  res.json(db);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/", "index.html"));
});

app.listen(3000, function () {
  console.log("I am listening on port 3000");
});
