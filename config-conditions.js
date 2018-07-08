function defaultValueByValue(arg) {

  if (typeof(arg) === 'object') {
    if (arg instanceof Array) {
      return [];
    } else {
      return {};
    }
  } else if (typeof(arg) === 'boolean') {
    return false;
  } else if (typeof(arg) === 'string') {
    return '';
  } else if (typeof(arg) === 'number') {
    return 0;
  }
}

module.exports.ifFlag = (flag, argThen, argElse) => {

  if (!argThen) {
    return flag;
  }

  if (flag) {
    return argThen;
  } else {
    if (argElse) {
      return argElse;
    } else {
      return defaultValueByValue(argThen);
    }
  }
};

module.exports.switchValue = (value, cases) => {

  let lastKeyValue;

  for (let key in cases) {
    if (cases.hasOwnProperty(key)) {
      if (value === key) {
        lastKeyValue = cases[key];
        return cases[key];
      }
    }
  }

  return defaultValueByValue(lastKeyValue);
};
