const controller = require ("../Controller/controller.js");
const db = require ("./setup");

class Group{
  constructor(){

  }

  static create(name, cb){
    let insertName = `INSERT INTO groups (name)
                      VALUES ('${name}');`

    db.run(insertName, function(err){
      if(err) throw err;
      cb(name)
    })
  }

  static update(value, id, cb){
    value = value.toLowerCase();

    let updateName = `UPDATE groups
                      SET name =  '${value}'
                      WHERE id = ${id};`

    db.all(updateName, function(err, updatedDate){
      if (err) throw err;
      cb(value, id, updatedDate);
    })
  }

  static show(id, cb){
    let showAllQuery = `SELECT name FROM groups
                        WHERE contacts.id = ${id};`

    db.all(showAllQuery, function(err,showData){
      if(err) throw err;
      cb(showData);
    })
  }

  static delete(id, cb){
    let deleteQuery = `DELETE FROM groups
                       WHERE groups.id = ${id};`

    db.run(deleteQuery, function(err){
      if(err) throw err;
      let deleteQueryContactGroup = `DELETE FROM contact_group
                                     WHERE contact_group.group_id = ${id};`

      db.run(deleteQueryContactGroup, function(err){
        if(err) throw err;
        cb(id);
      })
    })
  }
}

module.exports = Group;