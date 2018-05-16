const db = require('./setup');
const fs = require('fs');

//create table

let arrQuery = []
let crtContact = `CREATE TABLE IF NOT EXISTS contacts (
    id      INTEGER PRIMARY KEY AUTOINCREMENT
                    NOT NULL,
    name    TEXT,
    company TEXT,
    phone   TEXT,
    email   TEXT,
    address TEXT
);`

arrQuery.push(crtContact);

let crtGroup = `CREATE TABLE IF NOT EXISTS [group] (
    id          INTEGER PRIMARY KEY AUTOINCREMENT
                        NOT NULL,
    group_name  TEXT,
    description TEXT
);`

arrQuery.push(crtGroup);

let contactsGroup = `CREATE TABLE IF NOT EXISTS contact_group (
    id         INTEGER PRIMARY KEY AUTOINCREMENT
                       NOT NULL,
    contact_id INTEGER REFERENCES contacts (id) ON DELETE CASCADE,
    group_id   INTEGER REFERENCES [group] (id) ON DELETE CASCADE
);`

arrQuery.push(contactsGroup);

for (let i=0; i < arrQuery.length; i++){
    const query = arrQuery[i];
    db.run(query, (err) =>{
        if (err) throw err;
        console.log(`Succesfully added new table to database`)
    })
}


const stringContact = fs.readFileSync('./contacts.json','utf8');
const arrContact = JSON.parse(stringContact);

for (let i = 0; i < arrContact.length; i++){
    if (arrContact[i]){
        let query = `INSERT INTO contacts (name, company, phone, email, address)`
        query += `VALUES ("${arrContact[i].name}", "${arrContact[i].company}",`
        query += `"${arrContact[i].phone}","${arrContact[i].email}", "${arrContact[i].address}");`
        db.run(query, function (err){
            if (err) throw err;
            console.log('Successfully create a new row', arrContact[i]);
        })
    }
}


const stringGroup = fs.readFileSync('./group.json','utf8');
const arrGroup = JSON.parse(stringGroup);

for (let i = 0; i < arrGroup.length; i++){
    if (arrGroup[i]){
        let query = `INSERT INTO [group] (group_name, description) `
        query += `VALUES ("${arrGroup[i].groupName}", "${arrGroup[i].description}");`;
        db.run(query, function (err){
            if (err) throw err;
            console.log('Successfully create a new row', arrGroup[i]);
        })
    }
}