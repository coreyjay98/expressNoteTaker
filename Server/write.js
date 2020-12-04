const fs = require("fs").promises;
const Note = require("./Note");
const db = require("../db/db.json");

const newNotes = [];
let id = 0;
async function postData(req) {
  id += 1;
  const newPost = new Note(id, req.body.title, req.body.text);
  const notes = await readDB();
  if (notes) newNotes.push(...notes);
  newNotes.push(newPost);
  console.log("postPush", newNotes);
  fs.writeFile("../db/db.json", JSON.stringify(newNotes), function (err) {
    if (err) console.log(err);
    console.log("Saved");
  });
}

async function readDB() {
  const notesBuffer = await fs.readFile("../db/db.json");
  const notes = await JSON.parse(notesBuffer);
  return notes;
}

const deleteArr = [];

async function searchAndDelete(obj) {
  const notes = await simpleRead();
  deleteArr.push(...notes);
  console.log("groupy", deleteArr);
  deleteArr.splice(
    deleteArr.findIndex(({ id }) => id == obj.id),
    1
  );
  let filt = deleteArr.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );
  console.log("deleted notes", filt);
  fs.writeFile("../db/db.json", JSON.stringify(filt), function (err) {
    if (err) console.log(err);
    console.log("Deleted");
  });
  deleteArr.length = 0;
}

let sortingArr = [];

async function simpleNote(body) {
  id += Math.floor(Math.random() * 100 + 1);
  body.id = id;
  const notes = await simpleRead();
  sortingArr.push(...notes);
  sortingArr.push(body);
  let filt = sortingArr.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );
  console.log("fil", filt);
  fs.writeFile("../db/db.json", JSON.stringify(filt), function (err) {
    if (err) console.log(err);
    console.log("Saved");
  });
  sortingArr.length = 0;
}

async function simpleRead() {
  const notesBuffer = await fs.readFile("../db/db.json");
  const notes = await JSON.parse(notesBuffer);
  return notes;
}

module.exports = {
  postData,
  searchAndDelete,
  readDB,
  newNotes,
  simpleNote,
  simpleRead,
};
