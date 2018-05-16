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
	static updateContact(){
		model.updateContact(dataUser)
		.then(data=>{
			view.updateContact(data)
		})
		.catch(err=>{
			view.viewUpdateFailed(err)
		})
	}
	static addGroup(dataGroup){
		model.addGroup(dataGroup)
		.then(data=>{
			view.addGroup(data)
		})
		.catch(err=>{
			view.viewFailed(err)
		})
	}
}



module.exports = Controller