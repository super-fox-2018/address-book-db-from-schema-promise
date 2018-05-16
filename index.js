const Controller= require("./controller.js")
const argv = process.argv
const command = argv[2]

if(command == "addContact") {
	Controller.addContact(argv[3],argv[4],argv[5],argv[6])
}

if(command == "updateContact") {
	//namaTabel,namaColumn,value,id
	Controller.updateContact(argv[3],argv[4],argv[5],argv[6])	
} 

if(command == "deleteContact") {
	Controller.deleteContact(argv[3],argv[4])	
} 

if(command == "showContact") {
	Controller.showContact(argv[3])
}

if(command == "addGroup") {
	Controller.addGroup(argv[3])
}

if(command == "updateGroup") {
	Controller.updateGroup(argv[3],argv[4])
}

if(command == "deleteGroup") {
	Controller.deleteGroup(argv[3])
}

if(command == "showGroup"){
	Controller.showGroup(argv[3])
}

if(command == "assignContact") {
	Controller.assignContact(argv[3],argv[4])
}

if(command=="showAllGroups") {
	Controller.showAllGroups()
}

if(command=="showAllContacts") {
	Controller.showAllContacts()
}

