const db = require('./setup')

class Group {
    constructor(name, description) {
        this.id = 0;
        this.groupName = name;
        this.description = description;
    }

    save() {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO [group] (group_name, description) `;
            query += `VALUES ("${this.groupName}", "${this.description}"`
            query += `);`;
            let groupName = this.groupName
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(groupName)
                }
            })
        })
    }
    static delete(id) {
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM [group] where id =`;
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
    static retrieve() {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM [group]`
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

module.exports = Group;