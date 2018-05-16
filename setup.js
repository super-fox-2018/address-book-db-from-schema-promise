var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./group.db');

function table() {
  db.serialize((err)=>{
    if (err) {
      throw err
    }
    db.run(`CREATE TABLE  IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,company TEXT,phone TEXT,email TEXT)`)
    db.run(`CREATE TABLE  IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT)`)
  })
}

// table()
