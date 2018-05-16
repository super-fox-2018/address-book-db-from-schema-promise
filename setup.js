var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');

db.serialize(function() {

	db.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, company TEXT, phone INTEGER, email TEXT UNIQUE)`);
	db.run(`CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT)`);
	db.run(`CREATE TABLE IF NOT EXISTS contact_group (id INTEGER PRIMARY KEY, contact_id INTEGER,group_id INTEGER,FOREIGN KEY(contact_id) REFERENCES contacts(id) ON DELETE CASCADE,FOREIGN KEY(group_id) REFERENCES groups(id) ON DELETE CASCADE);`);

})

module.exports = db;