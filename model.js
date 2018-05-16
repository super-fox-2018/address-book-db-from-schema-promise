const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./addressBook.db')

class Model{
    static createContact(first_name, last_name, email, phone){
        let newContact = `INSERT INTO contacts (first_name, last_name, email, phone)
                            VALUES ('${first_name}', '${last_name}', '${email}', '${phone}')`
                            db.run(newContact, function(err){
                                if(err) throw err
                            })
    }

    static deleteContact(id){
        let delContact = `DELETE FROM contacts WHERE id=${id}`
        db.run(delContact, function(err){
            if(err) throw err
        })
    }

    static updateContact(first_name, last_name, email, phone, group_name, idContact){
        let updContact = `UPDATE contacts
                          SET first_name = '${first_name}',
                          last_name = '${last_name}',
                          email = '${email}',
                          phone = '${phone}',
                          group_name = '${group_name}' WHERE id = '${idContact}'`;
        db.run(updContact, function(err){
            if (err) throw err
        })
    }

    static showContact(callback){
        db.all(`SELECT * FROM contacts`, function(err, dataContact){
            if(err) throw err
            callback(dataContact)
        })
    }

    static createNewGroup(name){
        let newGroup = `INSERT INTO groups (name) VALUES ('${name}')`
        db.run(newGroup, function(err){
            if(err) throw err
        })
    }

    static deleteGroup(name){
        let delGroup = `DELETE FROM groups WHERE name='${name}'`
        db.run(delGroup, function(err){
            if(err) throw err
        })
    }

    static showGroup(callback){
        db.all(`SELECT * FROM groups`, function(err, dataGroup){
            if(err) throw err
            callback(dataGroup)
        })
    }
    
    // static createContactGroup(contact_id, group_id){
    //     let listContactGroup = `SELECT id FROM contacts JOIN group ON contacts.group_name = groups.name `
    // }

}

module.exports = Model