const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./database/address_book.db')
const {objToString, arrToObj} = require('../lib/queryHelper')

class ContactModel {

  static findAll(){
    return new Promise (function(res, rej){
      let query = `SELECT * FROM Contacts`
      db.all(query, function(err, data){
        if(err){
          rej(err)
        }else{
          res(data)
        }
      })
    })
  }

  static create(dataInput){
    return new Promise (function(res, rej){
      let query = `INSERT INTO Contacts VALUES (Null, ?, ?, ?, ?)`
      db.run(query, dataInput, function(err){
        if(err){
          rej(err)
        }else{
          res(dataInput[0])
        }
      })
    })
  }

  static update(updData){
    return new Promise (function(res, rej){
      let objUpdate = arrToObj(updData.slice(1))
      let setUpdate = objToString(objUpdate, ',')

      let query = `UPDATE Contacts SET ${setUpdate} WHERE id = ${Number(updData[0])} `
      db.run(query, function(err){
        if(err){
          rej(err)
        }else{
          res()
        }
      })
    })
  }

  static destroy(idContact, cb){
    return new Promise (function(res, rej){
      let query = `DELETE FROM Contacts WHERE id = ${idContact}`
      db.run(query, function(err){
        if(err){
          rej(err)
        }else{
          let queryCG = `DELETE FROM Contact_Groups WHERE contactId = ${idContact}`
          db.run(queryCG, function(err){
            if(err){
              rej(err)
            }else{
              res()
            }
          })
        }
      })
    })
  }

}

class Contact {
  constructor(arrContact) {
    this.name = arrContact[0],
    this.company = arrContact[1],
    this.phone = arrContact[2],
    this.email = arrContact[3]
  }
}
module.exports = ContactModel;
