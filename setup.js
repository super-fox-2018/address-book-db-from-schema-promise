const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contactPromise.db');

db.get('PRAGMA foreign_keys = ON');

module.exports = db;