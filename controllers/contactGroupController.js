const ContactGroup = require('./../models/contact-group');
const View = require('./../views');

class ContactGroupController {
  static handleAssign(ids, groupId) {
    ContactGroup.assign(ids, groupId)
      .then(contacts => {
        View.showMessage(`Successfully add contacts to group id : ${groupId}!`)
        if (contacts.length > 1) View.showContacts(contacts);
        else View.showContact(contacts[0]);
      })
      .catch(err => View.showError('Wrong input!'));
  }
}

module.exports = ContactGroupController;