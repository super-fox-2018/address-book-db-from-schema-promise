
const Controller = require('./controller.js');
const argv = process.argv;

let command = argv[2].toLowerCase()
let object = argv[3] !== undefined ? argv[3].toLowerCase() : ''

let listContacts = []
let group 
let contactSwitch = 'contact'
for(let i = 4; i < argv.length; i++){
    if(argv[i].toLowerCase() === 'to' || argv[i].toLocaleLowerCase() === 'from'){
        contactSwitch = 'group'
        i++
    }
    if(contactSwitch === 'contact')listContacts.push(argv[i])
    if(contactSwitch === 'group')group = argv[i]
}

if(command === 'help') Controller.showHelp();

switch(object){
    case "contact":
        switch(command){
            case "add":
                Controller.addContact(argv[4],argv[5])
                break;
            case "update":
                Controller.updateContact(argv[4],argv[5],argv[6])
                break;
            case "remove":
                Controller.removeContact(argv[4])
                break;
            case "show":
                Controller.showContact(argv[4])
                break;
            case "assign":
                Controller.assignContact(listContacts,group)
                break;
            case "kick":
                Controller.kickContact(listContacts,group)
                break;
        }
        break;
    case "group":
        switch(command){
            case "add":
                Controller.addGroup(argv[4])
                break;
            case "update":
                Controller.updateGroup(argv[4],argv[5])
                break;
            case "remove":
                Controller.removeGroup(argv[4])
                break;
            case "show":
                Controller.showGroup(argv[4])
                break;
        }
        break;
}
//satu contact banyak group 
//satu group banyak contact