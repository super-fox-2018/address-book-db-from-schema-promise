const Contact = require("./contact.js")
const Group = require("./group.js")
const View = require("./view.js")

class Controller{

    static showHelp(){
        View.help();
    }

    static addContact(name,number){
        Contact.addContactProcedure(name,number)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
    static updateContact(id,name,number){
        Contact.updateContactProcedure(id,name,number)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
    static removeContact(id){
        Contact.removeContactProcedure(id)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
    static showContact(id){
        Contact.showContactProcedure(id)
        .then(function(contact){
            return View.sendMessage(contact)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
    static assignContact(listcontact,group){
        Contact.assignContactProcedure(listcontact,group)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
    static kickContact(listcontact,group){
        Contact.kickContactProcedure(listcontact,group)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }

    static addGroup(name){
        Group.addGroupProcedure(name)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
    static updateGroup(id,name){
        Group.updateGroupProcedure(id,name)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
    static removeGroup(id){
        Group.removeGroup(id)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
    static showGroup(id){
        Group.showGroup(id)
        .then(function(message){
            return View.sendMessage(message)
        })
        .catch(function(err){
            return View.sendMessage(err)
        })
    }
}

module.exports = Controller;