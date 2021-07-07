const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')
const view = require('./view.js')

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
	static updateContact(id,dataUser){
		return new Promise(function(resolve,reject){
			let queryUpdate = 
			`update contacts
			 set name="${dataUser[0]}",company="${dataUser[1]}",phone="${dataUser[2]}",email="${dataUser[3]}"
			 where id=${id}`
			 let queryGet = 
			 `select id from contacts where id=${id}`
			 db.get(queryGet,function(err,data){
			 	console.log(data)
			 	if (data===undefined) {
			 		reject(err)
			 	}
			 	else{
				 	db.run(queryUpdate,function(err){
				 	console.log('-----',dataUser[3])
				 	console.log(this.changes)
				 		resolve(dataUser)
			   		})	
			 	}
			 })
			
		})
	}
	static deleteContact(id,name){
		return new Promise(function(resolve,reject){
			let queryDelete = 
			`delete from contacts
			 where id=${id} or name="${name}"`
			 let queryGet = 
			 `select id from contacts where id=${id}`
			 db.get(queryGet,function(err,data){
			 	if (data===undefined) {
			 		reject(err)
			 	}
			 	else{
			 		db.run(queryDelete,function(err){
			 			resolve(id)
			 		})
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