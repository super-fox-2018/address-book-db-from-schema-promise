
var Table = require('cli-table');
var table = new Table({
    head: ['ID', 'Group Name']
  , colWidths: [5, 10]
});

class ViewGroup {
  static showErr(err){
    console.log(err);
  }

  static showData(data){
    data.forEach(objData =>{
      table.push(Object.values(objData))
    })
    console.log(table.toString());
  }

  static succesAdd(groupName){
    console.log(`Added ${groupName} to group successfully`);
  }

  static succesUpdate(newName){
    console.log(`Group name updated to ${newName}`);
  }

  static succesDelete(id){
    console.log(`Group with id ${id} has been deleted`);
  }
}

module.exports = ViewGroup;
