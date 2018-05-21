class ViewHelp {
  static help(){
    console.log(`
      List of Contact on Group   ===>    node main.js listContactonGroup
      Add Contact to Group       ===>    node main.js addContactGroup contactName groupName
      Delete Contact From Group  ===>    node main.js deleteContactGroup contactName groupName
      Add Contact                ===>    node main.js addContact name,company,phone,email
      Display List of Contact    ===>    node main.js listContact
      Update Contact             ===>    node main.js updateContact noId column1,value1 column2,value2 ...
      Delete Contact             ===>    node main.js deleteContact noId
      Add Group                  ===>    node main.js addGroup name
      Display list of Group      ===>    node main.js listGroup
      Update Group               ===>    node main.js updateGroup noId newName
      Delete Group               ===>    node main.js deleteGroup noId
      `);
  }
}

module.exports = ViewHelp;
