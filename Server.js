const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { searchAndDelete, simpleNote } = require("./Server/write");

const port = process.env.PORT || 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static("./public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) console.log(err);
    let stored = JSON.parse(data);
    res.json(stored);
  });
});

app.post("/api/notes", function (req, res) {
  simpleNote(req.body);
  fs.readFile("./db/db.json", function (err, data) {
    if (err) console.log(err);
    let stored = JSON.parse(data);
    res.json(stored);
  });
});

app.delete("/api/notes/:id", function (req, res) {
  searchAndDelete(req.params);
  fs.readFile("./db/db.json", function (err, data) {
    if (err) console.log(err);
    let stored = JSON.parse(data);
    res.json(stored);
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/", "index.html"));
});

app.listen(port, function () {
  console.log("I am listening on port", port);
});
