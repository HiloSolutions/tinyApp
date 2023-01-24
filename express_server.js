//
//CONFIGURE APP
//
const express = require('express');
const app = express(); //func to call server object
const PORT = 8080;
app.set("view engine", "ejs");


//
//MIDDLEWARE
//
app.use(express.urlencoded({ extended: true })); //parse the body of POST request from a buffer to a string and make it readable


//
//DATABASE
//
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


//
//ROUTES
//

//get and render the urls_new template
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

//pass the single URL data to display a single URL and its shortened form
app.get("/urls/:id", (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

//redirect to long url link
app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});

//pass the URL data (urlDatabase) to urls_index template.
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

//generate shortURL  (callback)
const generateRandomString = () => {
  return Math.random().toString(36).slice(-6);
};

//add new url to database, redirect to short url page
app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL; //update database
  console.log(req.body); // Log the POST request body to the console
  res.redirect(`/urls/:${shortURL}`);
});

//delete url from database, redirct user to main page
app.post("/urls/:id/delete/", (req, res) => {
  console.log(req.params);
  const shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.redirect('/urls');
  //console.log(shortURL);
});

//edit url, choose url to update and takes user to upate form
app.post("/urls/:id/edit/", (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render(`urls_show`,templateVars);
});

//receive edit submission
app.post("/urls/:id", (req, res) => {
  const shortURL = req.params.id;
  console.log(urlDatabase[shortURL]);
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect('/urls');
});

//route handler to home.
app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});


//instructions for what to do when server starts up
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});