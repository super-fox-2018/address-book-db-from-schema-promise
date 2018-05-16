const controller = require("./controller.js");
const argv = process.argv;

let task = argv[2];
let category = argv[3];
switch(task){
  case "create":{
    if(category === "contact"){
      let objContact = {
        name: argv[4],
        company : argv[5],
        phone: argv[6],
        email: argv[7],
      }
      controller.contactCreate(objContact);
    }
    else if(category === "group"){
      let name = argv[4]
      controller.groupCreate(name);
    }
    break;
  }

  case "update":{
    if(category === "contact"){
      let column = argv[4];
      let value = argv[5];
      let id = argv[6];
      controller.contactUpdate(column, value, id);
    }
    else if(category === "group"){
      let value = argv[4];
      let id = argv[5];
      controller.groupUpdate( value, id);
    }
    break;
  }

  case "delete":{
    let id = argv[4];
    if(category === "contact"){
      controller.contactDelete(id);
    }
    else if(category === "group"){
      controller.groupDelete(id);
    }
    else if(category === "contact_group"){
      controller.contactGroupDelete(id);
    }
    break;
  }

  case "show":{
    if(category === "contact"){
      controller.contactShow();
    }
    else if(category === "group"){
      controller.groupShow();
    }
    break;
  }

  case "assign":{
    let contact_id = argv[4];
    let group_id = argv[5];
    controller.contactGroupAssign(contact_id, group_id);
    break;
  }
  default:{
    controller.help();
  }
}


