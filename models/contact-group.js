const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database/address_book.db');
const {objToString, arrToObj} = require('../lib/queryHelper')

class CGroupModel {

  static findAll(cb){
    return new Promise(function(res, rej){
      let query = `SELECT Contacts.id, Contacts.name, Contacts.company, Contacts.phone, Contacts.email, Groups.group_name
                   FROM Contacts
                   INNER JOIN Contact_Groups ON Contact_Groups.contactId = Contacts.id
                   INNER JOIN Groups ON Contact_Groups.groupId = Groups.id;`
      db.all(query, function(err, row){
        if(err){
          rej(err)
        }else{
          res(row)
        }
      })
    })
  }

  static create(dataInput){
    return new Promise(function(res, rej){
      let qContact = `SELECT * FROM Contacts WHERE name = '${dataInput[0]}'`
      db.get(qContact, function(err, rowContact){
        if(err){
          rej(err)
        }else if(rowContact == undefined){
          rej("not found")
        } else {
          let qGroup = `SELECT * FROM Groups WHERE group_name = '${dataInput[1]}'`
          db.get(qGroup, function(err, rowGroup){
            if(err){
              rej(err)
            } else if(rowGroup == undefined) {
              rej("not found")
            } else {
              let query = `INSERT INTO Contact_Groups VALUES (NULL, ${rowContact.id}, ${rowGroup.id})`
              db.run(query, function(err){
                if(err){
                  rej(err)
                } else {
                  res(dataInput)
                }
              })
            }
          })
        }
      })

    })

  }

  static delete(dataInput){
    return new Promise(function(res, rej){
      let qContact = `SELECT * FROM Contacts WHERE name = '${dataInput[0]}'`
      db.get(qContact, function(err, rowContact){
        if(err){
          rej(err)
        }else if(rowContact == undefined){
          rej("not found")
        } else {
          let qGroup = `SELECT * FROM Groups WHERE group_name = '${dataInput[1]}'`
          db.get(qGroup, function(err, rowGroup){
            if(err){
              rej(err)
            } else if(rowGroup == undefined) {
              rej("not found")
            } else {
              let query = `DELETE FROM Contact_Groups WHERE contactId = ${rowContact.id} AND groupId = ${rowGroup.id}`
              db.run(query, function(err){
                if(err){
                  rej(err)
                } else {
                  res(dataInput)
                }
              })
            }
          })
        }
      })

    })

  }

}

module.exports = CGroupModel;
