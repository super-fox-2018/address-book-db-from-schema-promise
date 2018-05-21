var Table = require('cli-table');
var table = new Table({
    head: ['No', 'Name', 'Company', 'Phone', 'Email', 'Group']
  , colWidths: [5, 20, 20, 20, 20, 10]
});

class ViewCGroup {
  static showErr(err){
    console.log(err);
  }

  static showErrDelete(groupNcontact){
    console.log(`"${groupNcontact[0]}" not found in Group "${groupNcontact[1]}"`);
  }

  static showErrAdd(){
    console.log(`contact / group name not found`);
  }

  static showData(data){
    data.forEach(objData =>{
      table.push(Object.values(objData))
    })
    console.log(table.toString());
  }

  static succesAdd(groupNcontact){
    console.log(`Added "${groupNcontact[0]}" to group "${groupNcontact[1]}" successfully`);
  }

  static succesDelete(groupNcontact){
    console.log(`Delete "${groupNcontact[0]}" from group "${groupNcontact[1]}" successfully`);
  }
}

module.exports = ViewCGroup;
