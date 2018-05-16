const db = require('./setup');

class ContactGroup {
    constructor(contactId, groupId) {
        this.contactId = contactId;
        this.groupId = groupId
    }
    addContactGroup() {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO contact_group VALUES (`;
            query += `null, ${this.contactId}, ${this.groupId});`
            db.run(query, function (err) {
                if (err){
                    reject(err)
                }else{
                    resolve(1)
                }
            })
        })
    }
}

module.exports = ContactGroup;
