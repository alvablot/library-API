const express = require("express");
const app = express();
const port = 4000;
let result;
//console.log(db);

const model = require("../models/books.model");

async function getBooks(req, res) {
  result = await model.getAll();
  res.json(result);
}

async function getAvailableBooks(req, res) {
  result = await model.getAvailable();
  res.json(result);
}

async function getBook(req, res) {
  const id = req.params.id;
  const result = await model.getOne(id);
  if (result === 404) return res.status(404).json({ error: "Bok finns ej" });
  res.json(result);
}

async function postBook(req, res) {
  let data = req.body;
  const result = await model.addOne(data);
  if (result === 404) return res.status(404).json({ error: "Bok finns ej" });
  res.json(result);
}

async function deleteBook(req, res) {
  const id = req.params.id;
  const result = await model.deleteOne(id);
  if (result === 404) return res.status(404).json({ error: "Bok finns ej" });
  res.json(result);
}

async function putBook(req, res) {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
 // const result = await model.updateOne(id, data);
  //if (result === 404) return res.status(404).json({ error: "Bok finns ej" });
 // res.json(result);
}

async function patchBook(req, res) {
  const id = req.params.id;
  const data = req.body;
  //const result = await model.patchOne(id, data);
 // if (result === 404) return res.status(404).json({ error: "Bok finns ej" });
  res.json(data);
}

module.exports = {
  getBooks,
  getAvailableBooks,
  getBook,
  deleteBook,
  postBook,
  putBook,
  patchBook,
  result
};
