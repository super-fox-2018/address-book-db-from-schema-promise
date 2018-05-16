var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');

db.serialize(function() {

	db.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,company TEXT,phone TEXT,email TEXT UNIQUE)`);
	db.run(`CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT)`);
	db.run(`CREATE TABLE IF NOT EXISTS contact_groups(id INTEGER PRIMARY KEY, contact_id INTEGER,group_id INTEGER,FOREIGN KEY(contact_id) REFERENCES contacts(id),FOREIGN KEY(group_id) REFERENCES groups(id))`)

})	