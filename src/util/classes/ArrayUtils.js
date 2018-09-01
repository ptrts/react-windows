
export default class ArrayUtils {

  static isSubArray(array1, array2) {
    return array1.every((key) => array2.includes(key));
  }

  static arraysConsistOfSameElements(array1, array2) {
    return this.isSubArray(array1, array2) && this.isSubArray(array2, array1);
  }
}
