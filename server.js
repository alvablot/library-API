require("dotenv").config();
const express = require("express");
//const fs = require("fs");
const app = express();
const port = require("./routers/endpoints");
const jwt = require("jsonwebtoken");
const log = require("./middlewares/log");
const auth = require("./middlewares/auth");

app.use(express.json());

const usersRouter = require("./routers/users.router");
const booksRouter = require("./routers/books.router");
//app.use(timeStamp);
app.use(log);
app.use(booksRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port.port}`);
});
