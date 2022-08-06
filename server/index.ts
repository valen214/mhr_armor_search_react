
import path from "path";

import express from "express";

const app = express();


app.get(
  /^\/mhr_armor_search_react(\/(index\.html?)?)?$/,
(req, res) => {
  let build_path = path.join(__dirname, "..", 'build')
  res.sendFile(path.join(build_path, 'index.html'));
})

app.get(/\/mhr_armor_search_react.*/, (req, res) => {
  let build_path = path.join(__dirname, "..", 'build')
  //res.sendFile('public/')

  let file_path = req.path.replace(/^\/mhr_armor_search_react\//, "");
  console.log(
      "get /mhr_armor_search_react/*",
      build_path, file_path
  );
  res.sendFile(path.join(build_path, file_path));
})

app.get('/', (req, res) => {
  res.redirect('/mhr_armor_search_react');
})


app.listen(3000)

