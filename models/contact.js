const db = require('./../database');

class Contact {
  constructor(contactData) {
    this.id = contactData.id || null;
    this.username = contactData.username;
    this.company = contactData.company;
    this.email = contactData.email;
    this.phone_number = contactData.phone_number;
  }

  save() {
    const contact = this;
    const inputData = Object.keys(contact).reduce((acc, key, i) => {
      if (i !== 0) acc[`$${key}`] = contact[key];
      return acc;
    }, {});
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO contacts (username, company, email, phone_number)
              VALUES ($username, $company, $email, $phone_number)`,
            inputData, function(err) {
              if (err) return reject(err);
              console.log(this.lastID, inputData.$username);
              db.get(`SELECT id FROM contacts 
                      WHERE id = ${this.lastID} AND 
                            username = ?`,
                    [inputData.$username], (err, newContact) => {
                      if (err) return reject(err);
                      contact.id = newContact.id;
                      resolve();
                    });
            });
    });
  }

  static find(findData) {
    let findQuery = `SELECT contacts.*, groups.name AS groupName FROM contacts
                     LEFT JOIN contacts_groups ON contacts.id = contacts_groups.contact_id
                     LEFT JOIN groups ON contacts_groups.group_id = groups.id`;
    if (findData) {
      const props = Object.keys(findData);
      findQuery += ' WHERE ';
      for (let i = 0; i < props.length; i += 1) {
        const prop = props[i];
        findQuery += `contacts.${prop} = '${findData[prop]}'`
        if (i < props.length - 1) findQuery += ' AND ';
        else findQuery += ';';
      }
    } else findQuery += ';';

    return new Promise(function(resolve, reject) {
      db.all(findQuery, (err, contacts) => {
        if (err) return reject(err);
        else resolve(contacts);
      });
    });
  }

  static update(updatePrefix, updateData) {
    const prefix = Object.keys(updatePrefix)[0];
    let updateQuery = 'UPDATE contacts SET ';
    const keys = Object.keys(updateData);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      updateQuery += `${key} = '${updateData[key]}'`;
      if (i < keys.length - 1) updateQuery += ', ';
      else updateQuery += ' ';
    }

    updateQuery += `WHERE ${prefix} = ${updatePrefix[prefix]};`;
    return new Promise(function(resolve, reject) {
      db.run(updateQuery, (err) => {
        if (err) reject(err);
        const contactQuery = `SELECT * FROM contacts 
                              WHERE ${prefix} = ${updatePrefix[prefix]};`;
        db.get(contactQuery, (err, contact) => {
          if (err) reject(err);
          resolve(contact);
        });
      });
    });
  }

  static delete(deletePrefix) {
    const prefix = Object.keys(deletePrefix)[0];
    const contactQuery = `SELECT * FROM contacts 
                          WHERE ${prefix} = ${deletePrefix[prefix]};`;
    return new Promise(function(resolve, reject) {
      db.get(contactQuery, (err, contact) => {
        if (err) reject(err);
        const deleteQuery = `DELETE FROM contacts 
                              WHERE ${prefix} = ${deletePrefix[prefix]};`;
        db.run(deleteQuery, (err) => {
          if (err) reject(err);
          resolve(contact);
        });
      });
    });
  }
}

module.exports = Contact;