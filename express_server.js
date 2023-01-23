const express = require('express');
const app = express(); //func to call server object
const PORT = 8080;

app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//route handler to pass the URL data to our template.
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

//route handler
app.get("/", (req, res) => {
  res.send("Hello");
});

//route handler
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

//route handler
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

//instructions for what to do when server starts up
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});