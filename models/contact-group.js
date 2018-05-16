const db = require('./../database');

class ContactGroup {

  static assign(ids, groupId) {
    return new Promise(function(resolve, reject) {
      for (let i = 0; i < ids.length; i += 1) {
        const assignQuery = `INSERT INTO contacts_groups (contact_id, group_id)
                             VALUES (?, ?);`;
        db.run(assignQuery, [ids[i], groupId], (err) => {
          if (err) reject(err);
          if (i === ids.length - 1) {
            db.all(`SELECT * FROM contacts 
            WHERE id IN (${ids.join(',')});`, (err, contacts) => {
              if (err) reject(err);
              resolve(contacts);
            });
          }
        });
      }
    });
  }
}

module.exports = ContactGroup;