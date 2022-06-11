require("dotenv").config();
const express = require("express");

const booksModel = require("../models/books.model");

const fs = require("fs");
const app = express();
const port = require("../routers/endpoints");
const timeStamp = require("./timeStamp");
let result;
const log = (req, res, next) => {
  const { method, url, route, hostname, rawHeaders } = req;
  res.on("finish", async () => {
    let id = req.params.id;
    result = await booksModel.getOne(id).then(function (result) {
      console.log(result[0].title);
      let mess;
      if (id === undefined) id = false;
      let now = timeStamp();
      endpoints = url.split("/");
      //console.log(id);
      if (endpoints[1] === "auth") {
        if (endpoints[2] === "register") mess = "skapar ny användare";
        if (endpoints[2] === "login") mess = "loggar in användare";
      }
      if (endpoints[1] === "books") mess = "hämtar alla böcker";
      if (id && method === "POST") mess = "skapar ny bok";
      if (id && method === "GET") mess = `hämtar en bok`;
      if (id && method === "PATCH") mess = "uppdaterar bok";
      if (id && method === "DELETE") mess = "ta bort bok";

      if (endpoints[1] === "users") {
        if (endpoints[2] === "lend") mess = "lånar bok";
        if (endpoints[2] === "return") mess = "återlämnar bok";
      }
      if (endpoints[1] === "me") mess = "hämtar info om inloggad användare";

      let logRow =
        "Metod: " +
        method +
        " | statuskod: " +
        res.statusCode +
        " | endpoint: " +
        url +
        " " +
        mess +
        " " +
        timeStamp() +
        " " +
        rawHeaders[1] +
        "\n";
      app.use(express.json());

      fs.writeFile("./log.txt", logRow, { flag: "a+" }, (err) => {
        if (err) throw err;
        console.log("Log updated");
      });

      //console.log(res.route);
    });
  });
  next();
};

module.exports = log;
