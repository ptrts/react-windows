export default class ObjectUtils {

  static getOwnPropertyKeys(obj) {
    const keys = [];
    for (const key of obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  }

  static isEmpty(obj) {

    if (!obj) {
      return true;
    }

    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  static isNotEmpty(obj) {
    return !ObjectUtils.isEmpty(obj);
  }
}
