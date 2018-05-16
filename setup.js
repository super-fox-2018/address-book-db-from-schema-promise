const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./addressBook.db')
const fs = require('fs')

db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id integer PRIMARY KEY AUTOINCREMENT,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL UNIQUE,
    phone text NOT NULL UNIQUE,
    group_name text
);`)

db.run(`CREATE TABLE IF NOT EXISTS groups (
	id integer PRIMARY KEY AUTOINCREMENT,
	name text NOT NULL
);`)

db.run(`CREATE TABLE IF NOT EXISTS contact_groups (
	contact_id integer,
	group_id integer,
	PRIMARY KEY (contact_id, group_id),
	FOREIGN KEY (contact_id) REFERENCES contacts (id) 
			ON DELETE CASCADE ON UPDATE NO ACTION,
	FOREIGN KEY (group_id) REFERENCES groups (id) 
			ON DELETE CASCADE ON UPDATE NO ACTION
);`)

