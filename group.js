var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');


class Group{

	static addGroup(name) {
		return new Promise((resolve,reject) =>{
			let queryAdd = `INSERT INTO groups VALUES(null,"${name}")`
			db.run(queryAdd,function(err) {
				if(err) {
					reject(err)
				}else{
					resolve(`group dengan nama ${name} berhasil dimasukkan`)
				}
			})
		})
		
	}

	static updateGroup(value,id) {
		return new Promise((resolve,reject)=> {
			let queryUpdate = `UPDATE groups SET name = "${value}" WHERE id = "${id}" `
			db.run(queryUpdate,function(err) {
				if(err) {
					reject(err)
				}else{
					resolve(`${this.changes} data contact telah di update dengan id ${id}`)
				}
			})
		})
		
	}


	static deleteGroup(id) {
		return new Promise((resolve,reject) => {
			let queryDelete = `DELETE FROM groups WHERE id = ${id}`
			let checkId = `SELECT * FROM groups WHERE id = ${id}`

			db.get(checkId,function(err,row) {
				if(err) {
					reject(err)
				}else{
					if(row !== undefined) {
						db.run(queryDelete,function(err) {
							if(err) {
								reject(err)
							}else{
								db.run(`DELETE FROM contact_groups WHERE group_id = ${id}`,function(err) {
									if(err) {
										reject(err)
									}
									resolve(`GroupId  = ${id} telah di delete`)	
								})
							}
						})		
					}else{
						resolve("id tidak ditemukan")
					}	
				}
			})	
		})

		
	}

	static showGroup(id) {
		return new Promise((resolve,reject) => {
			let showQuery = `SELECT * FROM groups WHERE id = ${id}`
			db.get(showQuery,function(err,row) {
				if(err) {
					reject(err)
				}else{
					resolve(`id = ${row.id}, groupName =${row.name}`)
				}
				
			})
		})
		
	}

	static showAllGroups() {
		return new Promise((resolve,reject) => {
			db.all(`SELECT * FROM groups`,function(err,rows) {
				if(err) {
					reject(err)
				}else{
					resolve(rows)	
				}	

				
			})	
		})
		
	}

	
	


}

// Group.showGroup(2)

module.exports = Group