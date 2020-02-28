const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tables = [
  {
    routeName: 'johndoe',
    name: 'John Doe',
    party: 2,
    time: '9:00PM',
    contact: 407-555-5555
  }
];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

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

app.post("/api/tables", function(req, res) {
  let newTable = req.body;
 
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});

app.listen(PORT, function() {
  console.log("Server listening on PORT " + PORT);
});
