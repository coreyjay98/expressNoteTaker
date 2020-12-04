const fs = require("fs").promises;

const newNotes = [];
let id = 0;

const deleteArr = [];

async function searchAndDelete(obj) {
  const notes = await simpleRead();
  deleteArr.push(...notes);
  deleteArr.splice(
    deleteArr.findIndex(({ id }) => id == obj.id),
    1
  );
  let filt = deleteArr.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );
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
  searchAndDelete,
  newNotes,
  simpleNote,
  simpleRead,
};
