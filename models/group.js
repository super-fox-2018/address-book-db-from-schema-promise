const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./database/address_book.db')

class GroupModel {

  static findAll(){
    return new Promise (function(res, rej){
      let query = `SELECT * FROM Groups`
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
      let query = `INSERT INTO Groups VALUES (Null, ?)`
      db.run(query, dataInput, function(err){
        if(err){
          rej(err)
        }else{
          res(dataInput[0])
        }
      })
    })
  }

  static update(updData, cb){
    return new Promise (function(res, rej){

      let query = `UPDATE Groups SET group_name = '${updData[1]}' WHERE id = ${Number(updData[0])} `
      db.run(query, function(err){
        if(err){
          rej(err)
        }else{
          res(updData[1])
        }
      })
    })
  }

  static destroy(idGroup, cb){
    return new Promise (function(res, rej){
      let query = `DELETE FROM Groups WHERE id = ${idGroup}`
      db.run(query, function(err){
        if(err){
          rej(err)
        }else{
          let queryCG = `DELETE FROM Contact_Groups WHERE groupId = ${idGroup}`
          db.run(queryCG, function(err){
            if(err){
              rej(err)
            }else{
              res(idGroup)
            }
          })
        }
      })
    })
  }

}

module.exports = GroupModel;
