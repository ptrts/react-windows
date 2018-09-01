import ObjectUtils from './ObjectUtils';
import ArrayUtils from './ArrayUtils';

export default class EqualDeepUtils {

  static equalDeep(obj1, obj2) {

    const type1 = typeof obj1;
    const type2 = typeof obj2;

    if (type1 !== type2) {
      return false;
    }

    switch (type1) {
      case 'undefined':
        return true;

      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'symbol':
      case 'function':
        return obj1 === obj2;

      case 'object':
        return this._arraysOrObjectsEqualDeep(obj1, obj2);

      default:
        throw new Error('Unexpected type ' + type1);
    }
  }

  static _arraysOrObjectsEqualDeep(obj1, obj2) {

    const isNull1 = (obj1 === null);
    const isNull2 = (obj2 === null);
    if (isNull1 !== isNull2) {
      return false;
    }
    if (isNull1) {
      return obj1 === null && obj2 === null;
    }

    const isArray1 = Array.isArray(obj1);
    const isArray2 = Array.isArray(obj2);
    if (isArray1 !== isArray2) {
      return false;
    }
    if (isArray1) {
      return this._arraysEqualDeep(obj1, obj2);
    }

    return this._objectsEqualDeep(obj1, obj2);
  }

  static _arraysEqualDeep(array1, array2) {

    if (array1.size !== array2.size) {
      return false;
    }

    return array1.every((element1, i) =>
      this.equalDeep(element1, array2[i])
    );
  }

  static _objectsEqualDeep(obj1, obj2) {

    const keys1 = ObjectUtils.getOwnPropertyKeys(obj1);
    const keys2 = ObjectUtils.getOwnPropertyKeys(obj2);

    if (!ArrayUtils.arraysConsistOfSameElements(keys1, keys2)) {
      return false;
    }

    return keys1.every((key) =>
      this.equalDeep(obj1[key], obj2[key])
    );
  }
}
