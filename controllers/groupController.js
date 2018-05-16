const Group = require('../models/group');
const View = require('./../views');

class GroupController {
  static handleAdd(groupData) {
    const newGroup = new Group(groupData);
    newGroup.save()
      .then(() => {
        View.showMessage('New group created!');
        View.showGroup(newGroup);
      })
      .catch(err => View.showError('Wrong input!', err));
  }

  static mergeGroup(groups) {
    const ids = {};
    let counter = 0;
    return groups.reduce((acc, group) => {
      if (ids[group.id] === undefined) {
        ids[group.id] = counter;
        acc.push(group);
        acc[counter].memberName = [acc[counter].memberName];
        counter += 1;
      } else {
        const idx = ids[group.id];
        acc[idx].memberName.push(group.memberName);
      }
      return acc;
    }, []);
  }

  static handleFind(findData) {
    Group.find(findData)
      .then(groups => {
        const newGroups = this.mergeGroup(groups);
        if (newGroups.length > 1) View.showGroups(newGroups);
        else View.showGroup(newGroups[0]);
      })
      .catch(err => View.showError('Groups not found!', err));
  }

  static handleUpdate(updatePrefix, updateData) {
    Group.update(updatePrefix, updateData)
      .then(updatedGroup => {
        View.showContact(updatedGroup);
      })
      .catch(err => View.showError('Groups not found!', err)) ;
  }

  static handleDelete(deletePrefix) {
    Group.delete(deletePrefix)
        .then(deletedGroup => {
          View.showMessage('Successfully deleted group!');
          View.showGroup(deletedGroup);
        })
    .catch(err => View.showError('Groups not found!'));
  }
}

module.exports = GroupController;