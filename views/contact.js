var Table = require('cli-table');
var table = new Table({
    head: ['ID', 'Name', 'Company', 'Phone', 'Email']
  , colWidths: [5, 20, 20, 20, 20]
});

class ViewContact {
  static showErr(err){
    console.log(err);
  }

  static showData(data){
    data.forEach(objData =>{
      table.push(Object.values(objData))
    })
    console.log(table.toString());
  }

  static succesAdd(contactName){
    console.log(`Added ${contactName} to contact successfully`);
  }

  static succesUpdate(){
    console.log(`Contact updated`);
  }

  static succesDelete(){
    console.log(`Contact deleted`);
  }
}

module.exports = ViewContact;
