const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class Group {
  constructor(obj) {
    this.id = obj.id || null;
    this.name = obj.name || null;
  }
  add() {
    let group = this;
    let query = `INSERT INTO groups (name) VALUES ('${this.name}');`;
    return new Promise(function(resolve, reject) {
      db.run(query, function(err) {
        if (err) throw err;
        group.id = this.lastID;
        resolve(`Successfully add new group, group id: ${group.id}`);
      });
    });
  }

  delete() {
    let group = this;
    let query = `DELETE FROM groups WHERE id = '${this.id}';`;
    return new Promise(function(resolve, reject) {
      if (err) throw err;
      db.run(query, function(err) {
        resolve(`Successfully delete group id: ${group.id}`);
      });
    });
  }

  update() {
    let group = this;
    db.run(`UPDATE groups SET name = '${this.name}' WHERE id = '${this.id}';`);
    return new Promise(function(resolve, reject) {
      resolve(`Successfully update contact id: ${group.id}`);
    });
  }

  show() {
    let group = this;
    return new Promise(function(resolve, reject) {
      db.all(`SELECT groups.*, contacts.name AS contact_name FROM groups
          JOIN contacts_groups ON contacts_groups.group_id = groups.id
          JOIN contacts ON contacts.id = contacts_groups.contact_id
          WHERE groups.id = ${this.id};`, (err, group) => {
              resolve(group);
            });
    });
  }
}

module.exports = Group;
