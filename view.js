class View{
    static displayHelp(){
        console.log("contacts command")
        console.log("adding contact          : addContact <name> : <company> : <phone> : <email> : <address>")
        console.log("updating contact        : updateContact <id> <column name> = <value>")
        console.log("show contact            : showContact <id>")
        console.log("delete contact          : deleteContact <id>")
        console.log("adding contact to group : assignContact <contact id> <group id>")
        console.log("adding group            : addGroup <group name> <description>")
        console.log("delete group            : deleteGroup <id>")
    }
    static display(msg){
        console.log(msg)
    }
    static displayContact(contact, groupList){
        for (let key in contact){
            if (key !== 'id'){
                console.log(`${key} : ${contact[key]}`);
            }
        }
        let arrGroup = [];
        for (let i =0; i < groupList.length; i++){
            arrGroup.push(groupList[i].group_name)
        }
        console.log('group name: ', arrGroup);
    }
}

module.exports = View