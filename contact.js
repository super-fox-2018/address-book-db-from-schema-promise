var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./address_book.db');


class Contact {

	static addContact(name,company,phone,email) {
		return new Promise((resolve,reject)=> {
			if(phone.length<=12 && email.indexOf("@")!==-1 && email.indexOf(".") !== -1) {
				let insertQuery = `INSERT INTO contacts VALUES(null,"${name}","${company}","${phone}","${email}")`
				db.run(insertQuery,function(err) {
					if(err) {
						reject(err)
					}else{
						resolve(`data name:"${name}",company:"${company}",phone:"${phone}",email:"${email}" berhasil dimasukkan`)
					}
				})
			}else{
				resolve('email atau nomor tidak valid')
			}

		})
		
	}


	static updateContact(tableName,columnName,value,id) {
		return new Promise((resolve,reject) => {
			let queryUpdate= `UPDATE ${tableName} SET ${columnName} = "${value}" WHERE id = ${id}`
			db.run(queryUpdate,function(err) {
				if(err) {
					resolve(err)
				}else{
					reject(`${this.changes} data contact telah di update dengan id ${id}`)
				}
			})	
		})

		
	}

	static deleteContact(tableName,id) {
		return new Promise((resolve,reject) =>{
			let checkId = `SELECT * FROM ${tableName} WHERE id = ${id}`
			let deleteQuery = `DELETE FROM ${tableName} WHERE id = "${id}"`
			db.get(checkId,function(err,row) {
				if(err) {
					reject(err)
				}else{
					if(row !== undefined) {
						db.run(deleteQuery,function(err) {
							if(err) {
					 			reject(err)
							}else {
								db.run(`DELETE FROM contact_groups WHERE contact_id = ${id}`,function(err){
									if(err) {
										reject(err)
									}else{
										resolve(`id  = ${id} telah di delete`)
									}	
								})
					 			
							}
						})
					}else {
						resolve(`tidak ada id tersebut`)
					}
				}
			})	
		})
		
	}

	static showContact(id) {
		return new Promise((resolve,reject)=> {
			let showQuery = 
			`SELECT contacts.name AS contactName,company,phone,email,groups.name AS groupName FROM contact_groups 
				JOIN contacts
				ON contact_groups.contact_id = contacts.id
				JOIN groups
				ON contact_groups.group_id = groups.id
			WHERE contacts.id = ${id}`
			var groupName = ""
			db.all(showQuery,function(err,rows) {
				if(err) {
					reject(err)
				}else{
					if(rows.length == 0){
						resolve("id tidak ditemukan")
					}else{
						for(let i=0;i<rows.length;i++) {
							var contactName = rows[i].contactName;
							var company = rows[i].company
							var phone = rows[i].phone
							var email = rows[i].email
							groupName+=rows[i].groupName+" "
						}
				
						resolve(`contactName = ${contactName},company = ${company},phone = ${phone},email = ${email},groupName = ${groupName}`)	
					}
						
				}
				
			})
		})
			

		//console.log(groupName)
	}

	static showAllContacts() {
		return new Promise((resolve,reject) => {
			db.all(`SELECT * FROM contacts`,function(err,rows) {
				if(err) {
					reject(err)
				}else {
					resolve(rows)
				}
				
			})	
		})	

		
	}

	static assignContact(idContact,idGroup) {
		return new Promise((resolve,reject)=>{
			db.get(`SELECT * FROM contacts WHERE id = ${idContact}`,function(err,row) {
				if(err) {
					console.log("====")
					reject(err)
				}
				if(row !== undefined) {
					db.get(`SELECT * FROM contact_groups WHERE contact_id = ${idContact}`,function(err,row) {
						if(err) {
							console.log("====")
							reject(err)
						}
						if(row!==undefined) {
							db.run(`INSERT INTO contact_groups VALUES(null,"${idContact}","${idGroup}")`)
							resolve(`data berhasil diupdate`)	
						}
								
					})
				}	
			})	
		})
		
		
	}


}



module.exports = Contact