const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bookAddressDB.db')

let createTable = [
    `CREATE TABLE IF NOT EXISTS contacts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        number INTEGER
    )`,
    `CREATE TABLE IF NOT EXISTS groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS contacts_groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_id INTEGER,
        group_id INTEGER,
        FOREIGN KEY(contact_id) REFERENCES contacts(id),
        FOREIGN KEY(group_id) REFERENCES groups(id)
    )`
]


for(let i = 0; i < createTable.length; i++){
    db.run(createTable[i],(err)=>{
        if(err) throw err;
        if(i===createTable.length-1) {
            db.run(`PRAGMA foreign_keys = ON;`)
            readNow();
        }
    })
}

function readNow(){
    fs.readFile('contacts.csv','utf-8',(err,contacts)=>{
        if(err) throw err;
        contacts = contacts.split('\n')
        for(let i = 1; i < contacts.length; i++){
            contacts[i] = contacts[i].split(',')
            db.run(`INSERT INTO contacts (${contacts[0]}) VALUES ("${contacts[i][0]}","${contacts[i][1]}")`,(err)=>{
                if(err) throw err;
            })
        }
    })
    
    fs.readFile('groups.csv','utf-8',(err,groups)=>{
        if(err) throw err;
        groups = groups.split('\n')
        for(let i = 1; i < groups.length; i++){
            db.run(`INSERT INTO groups (${groups[0]}) VALUES ("${groups[i]}")`,(err)=>{
                if(err) throw err;
            })
        }
    })
    
}
