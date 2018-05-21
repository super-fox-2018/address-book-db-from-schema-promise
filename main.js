
const Controller = require('./controllers/index');
const ContactController = require('./controllers/contact');
const GroupController = require('./controllers/group');
const CGroupController = require('./controllers/contact-group');

const argv= process.argv;
const command = argv.slice(2)

switch (command[0]) {
  case 'help':
    Controller.help()
    break;

  case 'addContact':
    let dataContact = command.slice(1)
    ContactController.createContact(dataContact)
    break;

  case 'listContact':
    ContactController.listContact()
    break;

  case 'updateContact':
    let inputData = command.slice(1)
    ContactController.updateContact(inputData)
    break;

  case 'deleteContact':
    ContactController.deleteContact(command[1])
    break;

///////////////////////

  case 'addGroup':
    let dataGroup = command.slice(1)
    GroupController.addGroup(dataGroup)
    break;

  case 'listGroup':
    GroupController.listGroup()
    break;

  case 'updateGroup':
    let nameGroup = command.slice(1)
    GroupController.updateGroup(nameGroup)
    break;

  case 'deleteGroup':
    GroupController.deleteGroup(command[1])
    break;

//////////////////////
  case 'listContactonGroup':
    CGroupController.listContactGroup()
    break;

  case 'addContactGroup':
    let dataCGroup = command.slice(1)
    CGroupController.addContactGroup(dataCGroup)
    break;

  case 'deleteContactGroup':
    let deleteCGroup = command.slice(1)
    CGroupController.deleteContactGroup(deleteCGroup)
    break;

  default: Controller.help()

}
