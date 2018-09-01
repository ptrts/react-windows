
export default class TextValidators {

  static pattern(pattern) {

    if (typeof pattern === 'string') {

      const firstChar = pattern.charAt(0);
      if (firstChar !== '^') {
        pattern = '^' + pattern;
      }

      const lastChar = pattern.slice(-1);
      if (lastChar !== '$') {
        pattern = pattern + '$';
      }

      pattern = new RegExp(pattern);
    }

    return (value) => {
      if (!pattern.test(value)) {
        return {pattern: true};
      }
    };
  }

  static minLength(length) {
    return (value) => {
      if (value && value.length < length) {
        return {minLength: true};
      }
    };
  }

  static required() {
    return (value) => {
      if (!value) {
        return {required: true};
      }
    }
  }
}
