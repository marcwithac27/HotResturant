// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
let tables = [
  {
    routeName: 'johndoe',
    name: 'John Doe',
    party: 2,
    time: '9:00PM',
    contact: 4075555555
  }
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

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays a single character, or returns false
app.get("/api/tables/:table", function(req, res) {
  var chosen = req.params.table;

  console.log(chosen);

  tables.forEach((table) => {
    if (chosen === table.routeName) {
      return res.json(table)
    }
  })

  return res.json(false);
});

// Create New tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("Server listening on PORT " + PORT);
});
