let controller = require('./controller.js')
const argv = process.argv
const commands = argv.slice(2)
//console.log(commands)

if (commands[0]==='addContact') {
	let data = commands.slice(1)
	console.log(data)
	controller.addContact(data)
}
if (commands[0]==='addGroup') {
	controller.addGroup(commands[1])
}
if (commands[0]==='updateContact') {
	let id = commands[1]
	let data = commands.slice(2)
	console.log(id,data)
	controller.updateContact(id,data)
}
if (commands[0]==='deleteContact') {
	controller.deleteContact(commands[1],commands[2])
}
if(commands[0]==='showContact'){
	if (commands[1]==='all') {
		controller.showContact('all')
	}
	else{
		controller.showContact(commands[1])
	}
}