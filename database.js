const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const uuid = require("uuid");
const md5 = require("md5");
const dbFile = "./data/books_db.db";
const exists = fs.existsSync(dbFile);

const db = new sqlite3.Database(dbFile, (error) => {
  if (error) {
    //console.error(error.message);
    throw error;
  }

  const usersStmt = `CREATE TABLE users (
    id VARCHAR (255) PRIMARY KEY UNIQUE,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    email VARCHAR (255) UNIQUE,
    password CHAR (60) DEFAULT (666) 
  )
  `;
  const booksStmt = `CREATE TABLE books (
    id VARCHAR (255) PRIMARY KEY UNIQUE,
    title VARCHAR (255),
    author VARCHAR (255),
    isbn VARCHAR (255),
    publication_date DATE,
    binding VARCHAR (255),
    user_id VARCHAR (255),
    available BOOLEAN DEFAULT (true)
  )
  `;
  if (!exists) {
    db.run(usersStmt, (error) => {
      if (error) {
        //console.error(error.message);
        //throw error;
      } else {
        const insertUsers = `INSERT INTO users (
        id, 
        first_name, 
        last_name, 
        email, 
        password) VALUES (?, ?, ?, ?, ?)`;
        db.run(insertUsers, [
          uuid.v4(),
          "Petter",
          "Karlsson",
          "petter.karlsson@cmeducations.se",
          md5("666"),
        ]);
      }
    });

    db.run(booksStmt, (error) => {
      const insertBooks = `INSERT INTO books (
        user_id,
        binding,
        publication_date,
        isbn,
        author,
        title,
        id,
        available
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      db.run(insertBooks, [
        "NULL",
        "Pocket",
        "1991-01-01",
        "9780450537370",
        "Stephen King",
        "Lida",
        uuid.v4(),
       "true"
      ]);
      db.run(insertBooks, [
        "NULL",
        "Inbunden",
        "1991-01-01",
        "9780450537370",
        "Astrid Lindgren",
        "Emil i Lönneberga",
        uuid.v4(),
        "true"
      ]);
      db.run(insertBooks, [
        "NULL",
        "Pocket",
        "1991-01-01",
        "9780450537370",
        "Bret Easton Ellis",
        "American Psycho",
        uuid.v4(),
        "true"
      ]);
    });
  }
});

module.exports = db;
