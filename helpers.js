class InputParser {
  static parse(input) {
    if (input[2] === undefined) return {};
    const option = input[2].toLowerCase();
    let obj = {};
    if (option === 'add') {
      const tableName = input[3].toLowerCase();
      let props = null;
      if (tableName === 'contacts') {
          props = input.slice(4).reduce((acc, prop, i) => {
          if (i === 0) acc.username = prop;
          else if (i === 1) acc.company = prop;
          else if (i === 2) acc.email = prop;
          else if (i === 3) acc.phone_number = prop;
          return acc;
        }, {});
      } else if (tableName === 'groups') {
          props = input.slice(4).reduce((acc, prop, i) => {
          if (i === 0) acc.name = prop;
          else if (i === 1) acc.description = prop;
          return acc;
        }, {});
      }

      obj = { option, tableName, props };
    } else if (option === 'find') {
      const tableName = input[3].toLowerCase();
      const optionalInput = input.slice(4);
      let props = null;
      if (optionalInput.length > 0) {
        props = optionalInput.reduce((acc, prop, i, arr) => {
          if (/^--/g.test(prop)) acc[prop.slice(2)] = arr[i + 1];
          return acc;
        }, {});
      }
      obj = { option, tableName, props };
    } else if (option === 'update') {
      const tableName = input[3].toLowerCase();
      const prefix = { [input[4].slice(2)] : input[5] };
      const optionalInput = input.slice(6);
      let props = null;
      if (optionalInput.length > 0) {
        props = optionalInput.reduce((acc, prop, i, arr) => {
          if (/^--/g.test(prop)) acc[prop.slice(2)] = arr[i + 1];
          return acc;
        }, {});
      }
      obj = { option, tableName, prefix, props }
    } else if (option === 'delete') {
      const tableName = input[3].toLowerCase();
      const prefix = { [input[4].slice(2)] : input[5] };

      obj = { option, tableName, prefix }
    } else if (option === 'assign') {
      const ids = input[3].split(',');
      const groupId = input[5];
      obj = { option, ids, groupId}
    }

    return obj;
  }
}

function beautifyString(str) {
  str = str.replace(/_/g, ' ');
  return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
  InputParser,
  beautifyString
}