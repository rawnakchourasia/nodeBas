const { REFUSED } = require("dns");
const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());
app.use(express.static("assets"));

// middleware 1
// app.use(function (req, res, next) {
//   req.myName = "raw";
//   // console.log("midd 1");
//   next();
// });

// // middleware 2
// app.use(function (req, res, next) {
//   console.log(req.myName);
//   // console.log("midd 2");
//   next();
// });

/*
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
*/

app.get("/", function (req, res) {
  //   console.log(req);
  //   console.log(__dirname); // Prints current index.js directory name
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
  // console.log(req.myName);
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetching contacts from DB");
      return;
    }

    return res.render("contacts", {
      title: "contacts",
      contactList: contacts,
    });
  });
});

app.post("/create-contact", function (req, res) {
  // console.log(req.body);
  // contact_list.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  // });

  // contact_list.push(req.body);

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("Error in creating a contact!");
        return;
      }
      console.log("* New Contact Created *", newContact);
      return res.redirect("back");
    }
  );

  // return res.redirect("/contacts");
});

app.get("/delete-contact/", function (req, res) {
  console.log(req.query);
  // Get the id from the query in the URL
  let id = req.query.id;

  //Find the contact in the database using id and delete it
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in deleting an object from DB");
      return;
    }
    return res.redirect("back");
  });

  /*
  let contactIndex = contact_list.findIndex(
    (contact) => contact.phone == phone
  );
  if (contactIndex != -1) {
    contact_list.splice(contactIndex, 1);
  }
  */
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server running on Port : ", port);
});
