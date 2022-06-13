require("dotenv").config();
const express = require("express");

const booksModel = require("../models/books.model");

const fs = require("fs");
const app = express();
const port = require("../routers/endpoints");
const timeStamp = require("./timeStamp");
//let result;
const log = (req, res, next) => {
  const { method, url, route, hostname, rawHeaders } = req;
  res.on("finish", async () => {

      let now = timeStamp();

      let logRow =
        "Metod: " +
        method +
        " | statuskod: " +
        res.statusCode +
        " | endpoint: " +
        url +
        //" " +
        //mess +
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
   // });
  });
  next();
};

module.exports = log;
