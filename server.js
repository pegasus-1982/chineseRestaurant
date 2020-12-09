// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();

var PORT = 3000;

//var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars table (DATA)
// =============================================================
var table = [
  {

    routeName: "ahmed",
    name: "Ahmed",
    role: "ahmed@example.com",
    age: 1,
    forcePoints: 000-000-0000
  },

  {

    routeName: "table2",
    name: "Ahmed",
    role: "ahmed@example.com",
    age: 1,
    forcePoints: 000-000-0000
  },

/*
{
  routeName: "1",
customerName: "Ahmed",
customerEmail: "ahmed@example.com",
customerID: ahmed@example.com,
phoneNumber: 000-000-0000
},
{
  routeName: "2",
  customerName: "Prueba",
  customerEmail: "fake@gmal.com",
  customerID: 2,
  phoneNumber: 5555 5555
  },

*/
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all table
app.get("/api/table", function(req, res) {
  return res.json(table);
});

// Displays table object, or returns false
app.get("/api/table/:table", function(req, res) {
  var chosen = req.params.table;

  console.log(chosen);

  for (var i = 0; i < table.length; i++) {
    if (chosen === table[i].routeName) {
      return res.json(table[i]);
    }
  }

  return res.json(false);
});

// Create New table - takes in JSON input
app.post("/api/table", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newTable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  table.push(newTable);

  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
