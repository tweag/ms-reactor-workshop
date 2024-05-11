const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.urlencoded({ extended: false }));

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, email TEXT)");
});

app.get('/add-user', (req, res) => {
  const { username, email } = req.query;
  const sql = `INSERT INTO users (username, email) VALUES ('${username}', '${email}')`;
  db.run(sql, function(err) {
    if (err) {
      return res.status(500).send("Failed to add user");
    }
    res.send("User added successfully");
  });
});

app.get('/', (req, res) => {
  const message = req.query.message || "Hello!";
  res.send(`<html><body><h1>${message}</h1></body></html>`);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
