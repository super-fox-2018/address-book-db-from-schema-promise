const Model = require('../models/group');
const View = require('../views/group');

class GroupController {

  static listGroup(){
    Model.findAll()
    .then(function(data){
      View.showData(data)
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

  static addGroup(newGroup){
    Model.create(newGroup)
    .then(function(groupName){
      View.succesAdd(groupName)
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

  static updateGroup(updGroup){
    Model.update(updGroup)
    .then(function(newName){
      View.succesUpdate(newName)
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

  static deleteGroup(idGroup){
    Model.destroy(idGroup)
    .then(function(id){
      View.succesDelete(id)
    })
    .catch(function(err){
      View.showErr(err)
    })
  }

}

module.exports = GroupController;
