const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./address_book.db');

class Contact {
  constructor(obj) {
    this.id = obj.id || null;
    this.name = obj.name || null;
    this.address = obj.address || null;
  }

  save() {
    let contact = this;
    let query = `INSERT INTO contacts (name, address) VALUES ('${this.name}', '${this.address}');'`;
    return new Promise(function(resolve, reject) {
      db.run(query, function(err) {
        if (err) throw err;
        contact.id = this.lastID;
        resolve(`Successfully add new contact, id: ${this.lastID}`);
      });
    });
  }

  delete() {
    let contact = this;
    let query = `DELETE FROM contacts WHERE id = '${this.id}';`;
    return new Promise(function(resolve, reject) {
      db.run(query, function(err) {
        if (err) throw err;
        resolve(`Successfully delete contact id: ${contact.id}`);
      });
    });
  }

  update() {
    let contact = this;
    return new Promise(function(resolve, reject) {
      db.run(`UPDATE contacts SET name = '${contact.name}', address = '${contact.address}'
        WHERE id = '${contact.id}';`, function(err) {
        resolve(`Successfully update contact id: ${contact.id}`);
      });
    });
  }

  show() {
    let contact = this;
    return new Promise(function(resolve, reject) {
      db.all(`SELECT contacts.*, groups.name AS group_name FROM contacts
          LEFT JOIN contacts_groups ON contacts.id = contacts_groups.contact_id
          LEFT JOIN groups ON contacts_groups.group_id = groups.id
          WHERE contacts.id = ${contact.id};`, (err, contactData) => {
              if (err) throw err;
              resolve(contactData);
            });
    });
  }

  assign(groupId) {
    let contact = this;
    let query = `INSERT INTO contacts_groups (contact_id, group_id) VALUES (${this.id}, ${groupId});`;
    return new Promise(function(resolve, reject) {
      db.run(query, function(err) {
        if (err) throw err;
        resolve(`Successfully assign contact id: ${contact.id} to group id: ${groupId}`);
      });
    });
  }
}

module.exports = Contact;
