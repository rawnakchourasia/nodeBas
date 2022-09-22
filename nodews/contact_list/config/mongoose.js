// Require the library
const mongoose = require("mongoose");

// Connect to the Database
mongoose.connect("mongodb://localhost/contacts_list_db");

// Acquire the connection (to check if it is successful)
const db = mongoose.connection;

// Error
db.on("error", console.error.bind(console, "error connecting to db"));

// Up and running then print this message
db.once("open", function () {
  console.log("Successfully connected to the database");
});

/*
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
*/
