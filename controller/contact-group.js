
const Model = require('../models/contact-group');
const View = require('../views/contact-group');

class CGroupController {

  static listContactGroup(){
    Model.findAll()
    .then(function(data){
      View.showData(data)
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

  static addContactGroup(newContact){
    Model.create(newContact)
    .then(function(groupNcontact){
      View.succesAdd(groupNcontact)
    })
    .catch(function(err){
      if(err == "not found"){
        View.showErrAdd()
      }else{
        View.showErr(err)
      }
    })
  }

  static deleteContactGroup(dataCGroup){
    Model.create(dataCGroup)
    .then(function(groupNcontact){
      View.succesDelete(groupNcontact)
    })
    .catch(function(err){
      if(err == "not found"){
        View.showErrDelete()
      }else{
        View.showErr(err)
      }
    })
  }

}

module.exports = CGroupController;
