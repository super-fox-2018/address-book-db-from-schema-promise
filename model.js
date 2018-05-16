const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

class Model{
	constructor(){
		
	}
	static addContact(dataUser){
		return new Promise((resolve,reject)=>{
			let queryAdd = 
			`insert into contacts (name,company,phone,email)
			 values ("${dataUser[0]}","${dataUser[1]}","${dataUser[2]}","${dataUser[3]}")`
			db.run(queryAdd,(err)=>{
				if (err) {
					reject(dataUser)
				}
				else{
					console.log(dataUser)
					resolve(dataUser)
				}
			})
		})
	}
	static addGroup(dataGroup){
		return new Promise((resolve,reject)=>{
			let queryAdd = 
			`insert into groups values(null,"${dataGroup}")`
			db.run(queryAdd,(err)=>{
				if (err) {
					reject(err)
				}
				else{
					resolve(dataGroup)
				}
			})
		})
	}
}

module.exports = Model