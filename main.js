const { InputParser } = require('./helpers');
const ContactController = require('./controllers/contactController');
const GroupController = require('./controllers/groupController');
const ContactGroupController = require('./controllers/contactGroupController');
const mainController = require('./controllers/mainController');
const argv = InputParser.parse(process.argv);

switch(argv.option) {
  case 'add':
    if (argv.tableName === 'contacts') ContactController.handleAdd(argv.props);
    else if (argv.tableName === 'groups') GroupController.handleAdd(argv.props);
    break;
  case 'find':
    if (argv.tableName === 'contacts') ContactController.handleFind(argv.props);
    else if (argv.tableName === 'groups') GroupController.handleFind(argv.props);
    break;
  case 'update':
    if (argv.tableName === 'contacts') ContactController.handleUpdate(argv.prefix, argv.props);
    else if (argv.tableName === 'groups') GroupController.handleUpdate(argv.prefix, argv.props);
    break;
  case 'delete':
    if (argv.tableName === 'contacts') ContactController.handleDelete(argv.prefix);
    else if (argv.tableName === 'groups') GroupController.handleDelete(argv.prefix);
    break;
  case 'assign':
    ContactGroupController.handleAssign(argv.ids, argv.groupId);
  default:
    mainController.showHelp();
}