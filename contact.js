const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bookAddressDB.db')

class Contact{
    static addContactProcedure(name,number){
        return new Promise(function(resolve,reject){
            db.run(`INSERT INTO contacts (name,number) VALUES (?,?)`,[name,number],(err)=>{
                if(err) return reject(err);
                resolve('contact has been added to the list!')
            })
        })
    }

    static updateContactProcedure(id,name,number){
        return new Promise(function(resolve,reject){
            db.get(`SELECT * FROM contacts WHERE id = ?`, [id], (err, contactFound)=>{
                if(err) return reject(err);
                if(contactFound !== undefined){
                    return db.run(`UPDATE contacts SET name = ?, number = ? WHERE id = ?`, [name,number,id],(errUpdate)=>{
                        if(errUpdate) return reject(err);
                        resolve('contact has been updated!')
                    })
                }
                reject('no contact found')
            })
        })
    }

    static removeContactProcedure(id){
        return new Promise(function(resolve,reject){
            db.run(`DELETE FROM contacts WHERE id = ?`,[id],(err)=>{
                if (err) return reject(err);
                resolve('contact has been deleted!')
            })
        })
    }

    static showContactProcedure(id){
        return new Promise(function(resolve,reject){
            db.get(`SELECT name,number FROM contacts WHERE id = ?`,[id],(err,contactFound)=>{
                db.all(`SELECT groups.name AS groupName FROM contacts JOIN contacts_groups ON contacts.id = contacts_groups.contact_id JOIN groups ON contacts_groups.group_id = groups.id WHERE contacts.id = ?`,[id],(err,contactGroup)=>{
                    if(err) return reject(err);
                    let contactObj = {
                        name : contactFound.name,
                        number : contactFound.number,
                        groups : contactGroup
                    }
                    resolve(contactObj)
                })
            })
        })
    }

    static assignContactProcedure(listcontact,group){

        return new Promise(function(resolve,reject){
            db.get(`SELECT * FROM groups WHERE id = ?`,[group],(err,groupFound)=>{
                if(err) return reject(err);
                if(groupFound !== undefined){
                    let peopleInsideAlready = []
                    for(let i = 0; i < listcontact.length; i++){
                        let passed = false
                        db.get(`SELECT * FROM contacts_groups WHERE contact_id = ? AND group_id = ?`, [listcontact[i],group], (err,relationFound)=>{
                            if(relationFound === undefined){
                                db.get(`SELECT * FROM contacts WHERE id = ?`,[listcontact[i]],(err,status)=>{
                                    if(err) return reject(err)
                                    if(status === undefined) return reject("contact with id "+listcontact[i] + " isn't found")
                                    db.run(`INSERT INTO contacts_groups (contact_id,group_id) VALUES (?,?)`,[listcontact[i],group],(err)=>{
                                        if(err) return reject(err);
                                        passed = true
                                        if(i === listcontact.length-1 && peopleInsideAlready.length > 0) {
                                            resolve(`contact(s) added to the group! people inside the group already: ${peopleInsideAlready}`)
                                        }else{
                                            resolve(`contact(s) added to the group!`)
                                        }
                                    })
                                })
                            }else{
                                passed = true
                                peopleInsideAlready.push(listcontact[i])
                            }
                            if(i === listcontact.length-1 && passed) resolve(`contact(s) added to the group! people inside the group already: ${peopleInsideAlready}`)
                        })
                    }
                }else{
                    return reject('no group found!')
                }
            })
        })
    }

    static kickContactProcedure(listcontact,group){
        for(let i = 0; i < listcontact.length; i++){
            db.run(`DELETE FROM contacts_groups WHERE contact_id = ? AND group_id = ?`,[listcontact[i],group],(err)=>{
                if(err) return reject(err);
                if(i === listcontact.length-1) resolve('contact(s) kicked from the group!')
            })
        }
    }

}

module.exports = Contact