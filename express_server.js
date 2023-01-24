const express = require('express');
const app = express(); //func to call server object
const PORT = 8080;

app.set("view engine", "ejs");
//middleware will parse the body of POST request from a buffer to a string and make it readable
app.use(express.urlencoded({ extended: true }));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//route handler to get and render the urls_new template
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

//route handler to pass the single URL data to whow.ejs
app.get("/urls/:id", (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});

//route handler to pass the URL data to our template.
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

const generateRandomString = () => {
  return Math.random().toString(36).slice(-6);
};
//logs the request body and gives a dummy form response.
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.redirect(`/urls/:${generateRandomString()}`);
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