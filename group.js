const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bookAddressDB.db')

class Group{
    static addGroupProcedure(name){
        return new Promise(function(resolve,reject){
            db.run(`INSERT INTO groups (name) VALUES (?)`,[name],(err)=>{
                if(err) return reject(err);
                resolve('group has been added!')
            })
        })
    }

    static updateGroupProcedure(id,name){
        return new Promise(function(resolve,reject){
            db.get(`SELECT * FROM groups WHERE id = ?`, [id],(err,groupFound)=>{
                if(err) return reject(err);
                if(groupFound !== undefined){
                    return db.run(`UPDATE groups SET name = ? WHERE id = ?`, [name,id],(err)=>{
                        if(err) return reject(err);
                        resolve('group has been updated!')
                    })
                }
                reject('no group found')
            })
        })
    }

    static removeGroup(id){
        return new Promise(function(resolve,reject){
            db.run(`DELETE FROM groups WHERE id = ?`, [id], (err)=>{
                if(err) return reject(err);
                db.run(`DELETE FROM contacts_groups WHERE group_id = ?`, [id], (err)=>{
                    if(err) return reject(err);
                    resolve('group has been deleted!')
                })
            })
        })
    }

    static showGroup(id){
        return new Promise(function(resolve,reject){
            db.get(`SELECT * FROM groups WHERE id = ?`,[id],(err,groupFound)=>{
                if(err) return reject(err);
                if(groupFound === undefined) return reject('no group found')

                db.all(`SELECT contacts.name FROM groups JOIN contacts_groups ON groups.id = contacts_groups.group_id JOIN contacts ON contacts.id = contacts_groups.contact_id WHERE groups.id = ?`,[id],(err,allConnectionData)=>{
                    let groupObj = {
                        name : groupFound.name,
                        members : allConnectionData
                    }
                    resolve(groupObj)
                })
            })
        })
    }
}

module.exports = Group