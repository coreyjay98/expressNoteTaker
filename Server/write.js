const fs = require("fs");
const Note = require("./Note");

let notes = [];
let id = 0;
function postData(req) {
  id += 1;
  const newPost = new Note(id, req.body.title, req.body.text);
  notes.push(newPost);
  fs.writeFile("../db/db.json", JSON.stringify(notes), function (err) {
    if (err) console.log(err);
    console.log("Saved");
  });
}

function searchAndDelete(obj) {
  notes.splice(
    notes.findIndex(({ id }) => id == obj.id),
    1
  );
  fs.writeFile("../db/db.json", JSON.stringify(notes), function (err) {
    if (err) console.log(err);
    console.log("Deleted");
  });
}

module.exports = { postData, searchAndDelete };
