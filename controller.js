const Contact = require('./contact');
const View = require('./view');
const ContactGroup = require('./contact-group');
const Group = require('./group');

class Controller {
    static showHelp() {
        View.displayHelp()
    }
    static addContact(arrParam) {
        arrParam = arrParam.join(' ').split(':');
        let name = (arrParam[0]) ? arrParam[0].trim() : '';
        let company = (arrParam[1]) ? arrParam[1].trim() : '';
        let phone = (arrParam[2]) ? arrParam[2].trim() : '';
        let email = (arrParam[3]) ? arrParam[3].trim() : '';
        let address = (arrParam[4]) ? arrParam[4].trim() : '';
        let contact = new Contact(name, company, phone, email, address);
        contact.save()
            .then(function (name) {
                let msg = `Add Contacnt ${name} sukses!`
                View.display(msg)
            })
            .catch(function (err) {
                let msg = `Add Contact fail: ${err}`
            })
    }
    static showContact(arrParam) {
        let id = arrParam[0];
        Contact.readContact(id)
            .then(function (contact) {
                Contact.listGroup(id)
                    .then(function (groupList) {
                        View.displayContact(contact, groupList)
                    })
            })
    }
    static updateContact(arrParam) {
        let id = arrParam[0];
        let arrSlice = arrParam.slice(1);
        let arrJoin = arrSlice.join(' ');
        let param = arrJoin.split('=')[0].trim();
        let value = arrJoin.split('=')[1].trim();
        Contact.update(id, param, value)
            .then(function (id) {
                Contact.readContact(id)
                    .then(function (contact) {
                        let msg = `Contact ${contact.name} has been updated!`;
                        View.display(msg);
                    })
                    .catch(function (err) {
                        let msg = `Updated fail : ${err}`;
                        View.display(msg);
                    })
            })
    }
    static deleteContact(arrParam) {
        let id = arrParam[0];
        Contact.delete(id)
            .then(function (changes) {
                let msg = ''
                if (changes > 0) {
                    msg = `contact ${id} deleted!`;
                } else {
                    msg = `Records id: ${id} not found`;
                }
                View.display(msg)
            })
    }

    static assignContact(arrParam) {
        let contactId = (arrParam[0]) ? arrParam[0] : '';
        let groupId = (arrParam[1]) ? arrParam[1] : '';
        if (contactId && groupId) {
            let contactGroup = new ContactGroup(contactId, groupId)
            contactGroup.addContactGroup()
                .then(function (success) {
                    if (success) {
                        let msg = `add contact ${contactId} to group ${groupId} success!`;
                        View.display(msg)
                    }
                })
                .catch(function (err) {
                    let msg = `add contact to group fail: ${err}`;
                    View.display(msg)
                })
        }
    }

    static addGroup(arrParam) {
        let nameGroup = arrParam.join(' ').split(':')[0].trim();
        let desc = arrParam.join(' ').split(':')[1].trim();
        let group = new Group(nameGroup, desc)
        group.save()
            .then(function (groupName) {
                let msg = `add group ${groupName} to table success!`;
                View.display(msg);
            })
            .catch(function (err) {
                let msg = `add group fail: ${err}`;
                View.display(msg);
            })
    }

    static deleteGroup(arrParam) {
        let id = arrParam.join('');
        Group.delete(id)
            .then(function (changes) {
                let msg = ''
                if (changes > 0) {
                    msg = `group ${id} deleted!`;
                } else {
                    msg = `Records id: ${id} not found`;
                }
                View.display(msg)
            })
    }
}

module.exports = Controller;