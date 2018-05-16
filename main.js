

const Controller = require('./controller');

let argv =process.argv
let command = argv[2]

if (command === 'register') {
  let commandRegister = argv.slice(3)
  Controller.addToContact(commandRegister)
} else if (command === 'addGroup') {
  let commandGroup = argv.slice(3)
  // console.log(commandGroup);
  Controller.addToGroup(commandGroup)
} else if (command === 'findContact') {
  let commandFindContact = argv.slice(3)
  Controller.showContact(commandFindContact)
} else if (command === 'delete') {
  let commandDelete = argv.slice(3)
  Controller.deleteContact(commandDelete)
}
