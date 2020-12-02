const fs = require("fs");
const Note = require("./Note");

let test = [];
let id = 0;
function postData(req) {
  id += 1;
  const newPost = new Note(id, req.body.title, req.body.text);
  test.push(newPost);
  fs.writeFile("../db/db.json", JSON.stringify(test), function (err) {
    if (err) console.log(err);
    console.log("Saved");
  });
}

module.exports = { postData };
