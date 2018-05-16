const View = require('./../views');

class MainController {
  static showHelp() {
    const helpMenu = [
      ['add','[tableName] [columnData1] [columnData2]...[columnDataN]'],
      ['find', '[tableName] ([--param] [paramValue])?'],
      ['update', '[tableName] [--uniqueColumn] [uniqueValue] [--columnName] [newValue]'],
      ['delete', '[tableName] [--uniqueColumn] [uniqueValue]'],
      ['assign', '[id1,id2,...,idN] to [groupId]']
    ]
    View.showHelp(helpMenu);
  }
}

module.exports = MainController;