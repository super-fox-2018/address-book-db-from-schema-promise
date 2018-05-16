const db = require('./../database');

class Group {
  constructor(groupData) {
    this.id = groupData.id || null;
    this.name = groupData.name;
    this.description = groupData.description;
  }

  save() {
    const group = this;
    const inputData = Object.keys(group).reduce((acc, key, i) => {
      if (i !== 0) acc[`$${key}`] = group[key];
      return acc;
    }, {});

    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO groups (name, description)
              VALUES ($name, $description)`,
            inputData, function(err) {
              if (err) return reject(err);
              console.log(this.lastID, inputData.$name);
              db.get(`SELECT id FROM groups
                      WHERE id = ${this.lastID} AND 
                            name = ?`,
                    [inputData.$name], (err, newGroup) => {
                      if (err) return reject(err);
                      group.id = newGroup.id;
                      resolve();
                    });
            });
    });
  }

  static find(findData) {
    let findQuery = `SELECT groups.*, contacts.username AS memberName FROM groups
                     LEFT JOIN contacts_groups ON groups.id = contacts_groups.group_id
                     LEFT JOIN contacts ON contacts_groups.contact_id = contacts.id`;
    if (findData) {
      const props = Object.keys(findData);
      findQuery += ' WHERE ';
      for (let i = 0; i < props.length; i += 1) {
        const prop = props[i];
        findQuery += `groups.${prop} = '${findData[prop]}'`
        if (i < props.length - 1) findQuery += ' AND ';
        else findQuery += ';';
      }
    } else findQuery += ';';


    return new Promise(function(resolve, reject) {
      db.all(findQuery, (err, groups) => {
        if (err) return reject(err);
        else resolve(groups);
      });
    });
  }


  static update(updatePrefix, updateData) {
    const prefix = Object.keys(updatePrefix)[0];
    let updateQuery = 'UPDATE groups SET ';
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
        const groupQuery = `SELECT * FROM groups 
                              WHERE ${prefix} = ${updatePrefix[prefix]};`;
        db.get(groupQuery, (err, groups) => {
          if (err) reject(err);
          resolve(groups);
        });
      });
    });
  }

  static delete(deletePrefix) {
    const prefix = Object.keys(deletePrefix)[0];
    const groupQuery = `SELECT * FROM groups 
                          WHERE ${prefix} = ${deletePrefix[prefix]};`;
    return new Promise(function(resolve, reject) {
      db.get(groupQuery, (err, group) => {
        if (err) reject(err);
        const deleteQuery = `DELETE FROM groups 
                              WHERE ${prefix} = ${deletePrefix[prefix]};`;
        db.run(deleteQuery, (err) => {
          if (err) reject(err);
          resolve(group);
        });
      });
    });
  }
}

module.exports = Group;