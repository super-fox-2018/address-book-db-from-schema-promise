const Contact = require('../models/contact');
const View = require('./../views');

class ContactController {
  static handleAdd(contactData) {
    const newContact = new Contact(contactData);
    newContact.save()
      .then(() => {
        View.showMessage('New contact created!');
        View.showContact(newContact);
      })
      .catch(err => View.showError('Wrong input!'));
  }

  static mergeContact(contacts) {
    const ids = {};
    let counter = 0;
    return contacts.reduce((acc, contact) => {
      if (ids[contact.id] === undefined) {
        ids[contact.id] = counter;
        acc.push(contact);
        acc[counter].groupName = [acc[counter].groupName];
        counter += 1;
      } else {
        const idx = ids[contact.id];
        acc[idx].groupName.push(contact.groupName);
      }
      return acc;
    }, []);
  }

  static handleFind(findData) {
    Contact.find(findData)
      .then(contacts => {
        const newContacts = this.mergeContact(contacts);
        if (newContacts.length > 1) View.showContacts(newContacts);
        else View.showContact(newContacts[0]);
      })
      .catch(err => View.showError('Contacts not found!', err));
  }

  static handleUpdate(updatePrefix, updateData) {
    Contact.update(updatePrefix, updateData)
      .then(updatedContact => {
        View.showContact(updatedContact);
      })
      .catch(err => View.showError('Contacts not found!', err));
  }

  static handleDelete(deletePrefix) {
    Contact.delete(deletePrefix)
        .then(deletedGroup => {
          View.showMessage('Successfully deleted contact!');
          View.showContact(deletedGroup);
        })
    .catch(err => View.showError('Contact not found!'));
  }
}

module.exports = ContactController;