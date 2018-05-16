const Controller = require('./controller');

let args = process.argv.slice(2);
let task = args[0];
let input = args.slice(1);

switch (task) {
case 'add':
  if (input[0] === 'contact') {
    Controller.addContact(input[1], input[2]);
  } else if (input[0] === 'group') {
    Controller.addGroup(input[1]);
  }
  break;
case 'delete':
  if (input[0] === 'contact') {
    Controller.deleteContact(input[1]);
  } else if (input[0] === 'group') {
    Controller.deleteGroup(input[1]);
  }
  break;
case 'update':
  if (input[0] === 'contact') {
    Controller.updateContact(input[1], input[2], input[3]);
  } else if (input[0] === 'group') {
    Controller.updateGroup(input[1], input[2]);
  }
  break;
case 'show':
  if (input[0] === 'contact') {
    Controller.showContact(input[1]);
  } else if (input[0] === 'group') {
    Controller.showGroup(input[1], input[2]);
  }
  break;
case 'assign':
  Controller.assignContact(input[0], input[1]);
  break;
case 'setup':
  Controller.setup();
  break;
default:
  // statements_def
  break;
}
