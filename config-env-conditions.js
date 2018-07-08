const {ifFlag, switchValue} = require('./config-conditions');

module.exports.ifDev = (argThen, argElse) => {
  return ifFlag(process.env.APP_ENV === 'dev', argThen, argElse);
};

module.exports.ifDist = (argThen, argElse) => {
  return ifFlag(process.env.APP_ENV === 'dist', argThen, argElse);
};

module.exports.ifTest = (argThen, argElse) => {
  return ifFlag(process.env.APP_ENV === 'test', argThen, argElse);
};

module.exports.ifNotTest = (argThen, argElse) => {
  return ifFlag(process.env.APP_ENV !== 'test', argThen, argElse);
};

module.exports.switchEnv = (cases) => {
  return switchValue(process.env.APP_ENV, cases);
};
