const Setup = require('./setup');
const Contact = require('./contact');
const Group = require('./group');
const View = require('./view');

class Controller {
  static setup() {
    Setup.setup();
  }

  static addContact(name, address) {
    let newContact = new Contact({name, address});
    newContact.save()
      .then(function(string) {
        View.displayText(string);
      });
  }

  static deleteContact(id) {
    let deletedContact = new Contact({id});
    deletedContact.delete()
      .then(function(string) {
        View.displayText(string);
      });
  }

  static updateContact(id, name, address) {
    let updatedContact = new Contact({id, name, address});
    updatedContact.update()
      .then(function(string) {
        View.displayText(string);
      });
  }

  static showContact(id) {
    let contact = new Contact({id});
    contact.show()
      .then(function(string) {
        View.displayText(string);
      });
  }

  static addGroup(name) {
    let newGroup = new Group({name});
    newGroup.save()
      .then(function(string) {
        View.displayText(string);
      });
  }

  static deleteGroup(id) {
    let deletedGroup = new Group({id});
    deletedGroup.delete()
      .then(function(string) {
        View.displayText(string);
      });
  }

  static updateGroup(id, name) {
    let updatedGroup = new Group({id, name});
    updatedGroup.update()
      .then(function(string) {
        View.displayText(string);
      });
  }

  static showGroup(id) {
    let group = new Group({id});
    group.show()
      .then(function(string) {
        View.displayText(string);
      });
  }

  static assignContact(contactId, GroupId) {
    let contact = new Contact({id: contactId});
    contact.assign(GroupId)
      .then(function(string) {
        View.displayText(string);
      });
  }
}

// let contact = new Contact({name: 'michael', address: 'gading'});
// console.log(`id sebelum save: ${contact.id}`);
// contact.save();
// console.log(`id setelah save:${contact.id}`);

// contact.name = 'mikael';
// contact.update();

module.exports = Controller;
