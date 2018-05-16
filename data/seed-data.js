const fs = require('fs');
const db = require('./../database');


fs.readFile(__dirname + '/contacts.json', 'utf8', (err, contactsString) => {
  const contacts = JSON.parse(contactsString);
  let insertContacts = `INSERT INTO contacts (username, company, email, phone_number) VALUES `
  for (let i = 0; i < contacts.length; i += 1) {
    const contact = contacts[i];
    insertContacts += `("${contact.username}", "${contact.company}", "${contact.email}", "${contact.phone_number}")`;
    if (i < contacts.length - 1) insertContacts += ',';
    else insertContacts += ';';
  }

  db.run (insertContacts, (err) => {
    if (err) throw err;
    console.log('Successfully added data to contacts table!');
  });
});

fs.readFile(__dirname + '/groups.json', 'utf8', (err, groupsString) => {
  const groups = JSON.parse(groupsString);
  let insertGroups = `INSERT INTO groups (name, description) VALUES `
  for (let i = 0; i < groups.length; i += 1) {
    const group = groups[i];
    insertGroups += `("${group.name}", "${group.description}")`;
    if (i < groups.length - 1) insertGroups += ',';
    else insertGroups += ';';
  }

  db.run (insertGroups, (err) => {
    if (err) throw err;
    console.log('Successfully added data to groups table!');
  });
});


