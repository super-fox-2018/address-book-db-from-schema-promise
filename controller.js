let model = require('./model.js')
let view = require('./view.js')

class Controller{
	constructor(){

	}

	static addContact(dataUser){
		model.addContact(dataUser)
		.then(data=>{
			view.addContact(data)
		})
		.catch(err=>{
			view.viewAddFailed(err)
		})
	}
	static updateContact(id,dataUser){
		model.updateContact(id,dataUser)
		.then(data=>{
			view.updateContact(data)
		})
		.catch(err=>{
			view.viewUpdateFailed(err)
		})
	}
	static deleteContact(id,data){
		model.deleteContact(id)
		.then(data=>{
			view.deleteContact(data)
		})
		.catch(err=>{
			view.viewDeleteFailed(err)
		})
	}
	static addGroup(dataGroup){
		model.addGroup(dataGroup)
		.then(data=>{
			view.addGroup(data)
		})
		.catch(err=>{
			view.viewAddFailed(err)
		})
	}
}



module.exports = Controller