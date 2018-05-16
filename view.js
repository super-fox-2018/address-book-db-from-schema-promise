class View{
    static help(){
        console.log("contacts queries:")
        console.log("adding contact: add contact <name> <number>")
        console.log("updating contact: update contact <id> <updated name> <updated number>")
        console.log("removing contact: remove contact <id>")
        console.log("view contacts: show contact <id>")
        console.log("adding contact to group: assign <contact1> <contact2> <contact3>... to <group to Assign>")
        console.log("kicking contacts from group: kick <contact1> <contact2> <contact3>... from <group to assign>")

        console.log("\n\ngroup queries:")
        console.log("adding group: add group <name>")
        console.log("updating group: update group <id> <updated name>")
        console.log("removing group: remove group <id>")
        console.log("removing group: remove group <id>")

        console.log("\nhave fun trying!")
    }

    static sendMessage(message){
        console.log(message)
    }
}

module.exports = View