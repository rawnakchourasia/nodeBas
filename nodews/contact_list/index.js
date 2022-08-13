const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

// middleware 1
app.use(function (req, res, next) {
  req.myName = "raw";
  // console.log("midd 1");
  next();
});

// middleware 2
app.use(function (req, res, next) {
  console.log(req.myName);
  // console.log("midd 2");
  next();
});

var contact_list = [
  {
    name: "Rawnak",
    phone: 92834902,
  },
  {
    name: "loki",
    phone: 349302934,
  },
  {
    name: "junior",
    phone: 8346355433,
  },
];

app.get("/", function (req, res) {
  //   console.log(req);
  //   console.log(__dirname); // Prints current inde.js directory name
  // res.send("<h1>Home Page</h1>");
  return res.render("home", {
    title: "it's home",
  }); // The file home is inside views folder
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "it's practice",
  });
});

app.get("/contacts", function (req, res) {
  console.log(req.myName);
  return res.render("contacts", {
    title: "contacts",
    contactList: contact_list,
  });
});

app.post("/create-contact", function (req, res) {
  // console.log(req.body);
  // contact_list.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  // });
  contact_list.push(req.body);
  // return res.redirect("/contacts");
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server running on Port : ", port);
});
