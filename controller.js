const Model = require('./model');
const View = require('./view');

class Controller {
  static addToContact(data) {
    Model.contact(data)
      .then(res => {
        View.showAddContact(res)
      })
      .catch(err => {
        View.showError(err)
      })
  }


  static addToGroup(dataGroup) {
    // console.log(dataGroup);
    Model.group(dataGroup)
      .then(res => {
        View.showGroup(res)
      })
      .catch(err => {
        View.showError(err)
      })
  }


  static showContact(show) {
    Model.contactShow(show)
      .then(res => {
        View.showPersonContact(res)
      })
      .catch(err => {
        View.showError(err)
      })
  }

  static deleteContact(dataDelete) {
    Model.contactDelete(dataDelete)
      .then(res => {
        View.showDelete(res)
      })
      .catch(err => {
        View.showError(err)
      })
  }
}


module.exports = Controller
