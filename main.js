const Controller = require('./controller')

const param = process.argv[2];
const arrParam = process.argv.slice(3);

switch (param) {
    case 'help':
        Controller.showHelp()
        break;
    case 'addContact':
        if (arrParam) {
            Controller.addContact(arrParam);
        }
        break;
    case 'showContact':
        if (arrParam) {
            Controller.showContact(arrParam)
        }
        break;
    case 'updateContact':
        if (arrParam) {
            Controller.updateContact(arrParam)
        }
        break;
    case 'deleteContact':
        if (arrParam) {
            Controller.deleteContact(arrParam)
        }
        break;
    case 'assignContact':
        if (arrParam) {
            Controller.assignContact(arrParam)
        }
        break;
    case 'addGroup':
        if (arrParam) {
            Controller.addGroup(arrParam)
        }
        break;
    case 'deleteGroup':
        if (arrParam) {
            Controller.deleteGroup(arrParam)
        }
        break;
    case 'showGroup':
        Controller.showGroup(arrParam)
        break;
    default:
        Controller.showHelp()
}
