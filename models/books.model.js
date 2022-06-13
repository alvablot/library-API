const uuid = require("uuid");
const db = require("../database.js");
let books;
const fetchTable = "SELECT * FROM books";
const fetchAvaiable = "SELECT * FROM books WHERE user_id = 'NULL'";
const deleteRow = "DELETE FROM books ";
const insertRow = "INSERT INTO books";
const updateRow = "UPDATE books";

function initBooks(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      resolve(rows);
    });
  });
}
async function getAll() {
  const query = fetchTable;
  const result = await initBooks(query);
  return result;
}

async function getAllAvaiable() {
  const query = fetchAvaiable;
  const result = await initBooks(query);
  return result;
}


async function getOne(id) {
  const query = `${fetchTable} WHERE id = '${id}'`;
  const result  = await initBooks(query);
  if (result.length < 1) return 404;
  return result;
}

async function addOne(data) {
  let { title, author, isbn, publication_date, binding} = data;
  const query = `
  ${insertRow} (id, title, author, isbn, publication_date, binding) 
  VALUES(?, ?, ?, ?, ?, ?)`;
  db.run(query, [
    uuid.v4(),
    title,
    author,
    isbn,
    publication_date,
    binding,
  ]);
  const result = await initBooks(fetchTable);
  if (result.length < 1) return 404;
  return result;
}



async function deleteOne(id) {
  db.run(`${deleteRow} WHERE id = ?`, id, (err) => {});
  const result  = await initBooks(fetchTable);
  if (result.length < 1) return 404;
  return result;
}

let column;
let insert;
async function updateOne(id, data) {
  let { title, author, isbn, publication_date, binding, user_id } = data;
  var query = `${updateRow} 
    SET 
      title = ?, 
      author = ?, 
      isbn = ?, 
      publication_date = ?, 
      binding = ?,
      user_id = ?    
    WHERE id=?`;
  db.run(query, [
    title,
    author,
    isbn,
    publication_date,
    binding,
    user_id,
    id,
  ]);
  const sql = `${fetchTable} WHERE id = '${id}'`;
  const result  = await initBooks(sql);

  if (result.length < 1) return 404;
  return result;
}

async function patchOne(id, data) {

  const query = `${fetchTable} WHERE id = '${id}'`;
  const result  = await initBooks(query);
  console.log(result)
  if (result.length < 1) return 404;

  
  if (data.title) {
    column = "title";
    insert = data.title;
  }
 if (data.author) {
    column = "author";
    insert = data.author;
  }
  if (data.isbn) {
    column = "isbn";
    insert = data.isbn;
  }
  if (data.publication_date) {
    column = "publication_date";
    insert = data.publication_date;
  }
  if (data.binding) {
    column = "binding";
    insert = data.binding;
  }
  if (data.user_id) {
    column = "user_id";
    insert = data.user_id;
  }
  if (data.available) { 
    column = "available";
    insert = data.available;
  }

  db.run(
    `${updateRow}
    SET ${column} = ?
    WHERE id = ?`,
    [insert, id]
  );

  return result;
}

module.exports = {
  books,
  getAll,
  getAllAvaiable,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  patchOne,
};
