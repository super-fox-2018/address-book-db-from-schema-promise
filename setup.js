const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/address_book.db');
const fs = require('fs');

db.serialize(function(){
  let createContact = `CREATE TABLE IF NOT EXISTS Contacts(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(50),
                        company VARCHAR(50),
                        phone VARCHAR(12) NOT NULL,
                        email VARCHAR(255),
                        CONSTRAINT phone_unique UNIQUE(phone)
                      );`;
  let createContactGroup = `CREATE TABLE IF NOT EXISTS Contact_Groups(
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              contactId INT,
                              groupId INT,
                                FOREIGN KEY(contactId) REFERENCES Contacts(id),
                                FOREIGN KEY(groupId) REFERENCES Groups(id)
                            );`;
  let createGroup = `CREATE TABLE IF NOT EXISTS Groups(
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              group_name VARCHAR(50)
                            );`;
  // db.run(createContact);
  // db.run(createContactGroup);
  // db.run(createGroup);

  let con = fs.readFileSync('./JSONFile/contact.json', 'utf8');
  let parse = JSON.parse(con)
  let insert = db.prepare("INSERT INTO Contacts VALUES (Null, ?, ?, ?, ?)")
  for(let i=0; i<parse.length; i++){
    insert.run(Object.values(parse[i]))
  }
  insert.finalize()

  // let con = fs.readFileSync('./JSONFile/group.json', 'utf8');
  // let parse = JSON.parse(con)
  // let insert = db.prepare("INSERT INTO Groups VALUES (Null, ?)")
  // for(let i=0; i<parse.length; i++){
  //   insert.run(Object.values(parse[i]))
  // }
  // insert.finalize()

  // let con = fs.readFileSync('./JSONFile/contactGroup.json', 'utf8');
  // let parse = JSON.parse(con)
  // let insert = db.prepare("INSERT INTO Contact_Groups VALUES (Null, ?, ?)")
  // for(let i=0; i<parse.length; i++){
  //   insert.run(Object.values(parse[i]))
  // }
  // insert.finalize()

});
db.close()
