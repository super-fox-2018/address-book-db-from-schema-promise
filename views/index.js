const { beautifyString } = require('./../helpers');

class View {
  static showContact(contact, groups) {
    const props = Object.keys(contact);
    for (let i = 0; i < props.length; i += 1) {
      const prop = props[i];
      if (prop === 'groupName') {
        const groups = contact[prop].join(', ') || 'None';
        console.log(`Joined groups : ${groups}`);
      } else {
        console.log(`${beautifyString(prop)} : ${contact[prop]}`);
      }
    }
  }

  static showContacts(contacts) {
    console.log('hit');
    for (let i = 0; i < contacts.length; i += 1) {
      const contact = contacts[i];
      this.showContact(contact);
      console.log('\n====================================\n');
    }
  }

  static showGroup(group) {
    const props = Object.keys(group);
    for (let i = 0; i < props.length; i += 1) {
      const prop = props[i];
      if (prop === 'memberName') {
        const members = group[prop].join(', ') || 'None';
        console.log(`Members : ${members}`);
      } else {
        console.log(`${beautifyString(prop)} : ${group[prop]}`);
      }
    }
  }

  static showGroups(groups) {
    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];
      this.showContact(group);
      console.log('\n====================================\n');
    }
  }

  static showMessage(message) {
    console.log(message);
  }

  static showError(message, err) {
    console.log(message);
    if (err) console.log(err);
  }

  static showHelp(helpMenu) {
    helpMenu.forEach(menu => {
      console.log(`Command : ${menu[0]}`);
      console.log(`node main.js ${menu[0]} ${menu[1]}`);
    });
  }
}

module.exports = View;