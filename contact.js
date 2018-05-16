const db = require('./setup');

class Contact {
    constructor(name, company, phone, email, address) {
        this.id = 0
        this.name = name;
        this.company = company
        this.phone = phone
        this.email = email
        this.address = address
    }

    save() {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO contacts (name, company, phone, email, address) `;
            query += `VALUES ("${this.name}", "${this.company}", "${this.phone}", "${this.email}",`
            query += `"${this.address}");`;
            let name = this.name
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(name)
                }
            })
        })
    }

    static update(id, param, value) {
        return new Promise((resolve, reject) => {
            let query = `UPDATE contacts SET `;
            query += `${param} = "${value}" `;
            query += `WHERE id = ${id};`
            db.run(query, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(id)
                }
            })
        })
    }

    static readContact(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM contacts where id =`;
            query += `${id}`;
            db.get(query, [], (err, rowCont) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(rowCont)
                }
            })
        })
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM contacts where id =`;
            query += `${id}`;
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            })
        })
    }

    static listGroup(id, callback) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM [group] where id in (`
            query += `SELECT group_id FROM contact_group WHERE contact_id = `;
            query += `${id});`;
            db.all(query, [], (err, groupList) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(groupList)
                }
            })
        })
    }
}

module.exports = Contact;
