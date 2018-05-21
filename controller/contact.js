
const Model = require('../models/contact');
const View = require('../views/contact');

class ContactController {

  static listContact(){
    Model.findAll()
    .then(function(data){
      View.showData(data)
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

  static createContact(newContact){
    Model.create(newContact)
    .then(function(contactName){
      View.succesAdd(contactName)
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

  static updateContact(updContact){
    Model.update(updContact)
    .then(function(){
      View.succesUpdate()
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

  static deleteContact(idContact){
    Model.destroy(idContact)
    .then(function(){
      View.succesDelete()
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

}

module.exports = ContactController;
