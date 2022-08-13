const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
  //   console.log(req);
  //   console.log(__dirname); // Prints current inde.js directory name
  // res.send("<h1>Home Page</h1>");
  return res.render("home"); // The file home is inside views folder
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server running on Port : ", port);
});
