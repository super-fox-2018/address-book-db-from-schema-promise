const db = require('./database');

const queries = [];

queries.push(
  `CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL
  );`
);

queries.push(
  `CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
  );`
);

queries.push(
  `CREATE TABLE IF NOT EXISTS contacts_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER,
    group_id INTEGER,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
  );`
);

queries.forEach((query, i) => {
  db.run(query, (err) => {
    if (err) throw err;
    if (i === queries.length - 1) {
      console.log('Successfully added all tables');
      db.run('PRAGMA foreign_keys = ON;');
      require('./data/seed-data');
    }
  });
});