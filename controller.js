const Contact = require("./contact.js")
const Group = require("./group.js")
const View = require("./view.js")

class Controller {

	static addContact(name,company,phone,email) {
		Contact.addContact(name,company,phone,email) 
		.then(result => {
			View.addContact(result)
		})	
		.catch(err=>{
			View.errorMessage(err)
		})
			
	
	}

	static updateContact(tableName,columnName,value,id) {
		Contact.updateContact(tableName,columnName,value,id) 
		.then(result => {
			View.updateContact(result)
		})	
		.catch(err=>{
			View.errorMessage(err)
		})	

	}

	static deleteContact(tableName,id ) {
		Contact.deleteContact(tableName,id) 
		.then(result => {
			View.deleteContact(result)
		})	
		.catch(err=>{
			View.errorMessage(err)
		})
	 }

	 static showContact(id) {
	 	Contact.showContact(id) 
		.then(result => {
			View.showContact(result)
		})	
		.catch(err=>{
			View.errorMessage(err)
		})

	 }

	 static addGroup(name) {
	 	Group.addGroup(name) 
		.then(result => {
			View.addGroup(result)
		})	
		.catch(err=>{
			View.errorMessage(err)
		})
	 }

	 static updateGroup(value,id) {
	 	Group.updateGroup(value,id) 
		.then(result => {
			View.updateGroup(result)
		})	
		.catch(err=>{
			View.errorMessage(err)
		})

	 }

	 static deleteGroup(id) {
	 	Group.deleteGroup(id)
	 	.then(result => {
			View.updateGroup(result)
		})	
		.catch(err=>{
			View.errorMessage(err)
		})
	 	
	 }

	 static showGroup(id) {
	 	Group.showGroup(id)
	 	.then(result => {
			View.updateGroup(result)
		})	
		.catch(err=>{
			View.errorMessage(err)
		}) 
	 
	 }

	 static assignContact(idContact,idGroup) {
	 	Contact.assignContact(idContact,idGroup)
	 	.then(result => {
	 		View.assignContact(result)
	 	})
	 	.catch(err => {
	 		View.errorMessage(err)
	 	})	

	 }

	 static showAllGroups() {
	 	Group.showAllGroups()
	 	.then(result => {
	 		View.showAllGroups(result)
	 	})
	 	.catch(err => {
	 		View.errorMessage(err)
	 	})
	 }

	 static showAllContacts() {
	 	Contact.showAllContacts()
	 	.then(result => {
	 		View.showAllContacts(result)
	 	})
	 	.catch(err => {
	 		View.errorMessage(err)
	 	})
	 }


}


module.exports = Controller