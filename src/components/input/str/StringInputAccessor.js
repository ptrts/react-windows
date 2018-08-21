import React from 'react';

class StringInputAccessor extends React.Component {

  constructor(props) {
    super(props);
  }

  setTouched() {
    const wasTouched = this.touched;
    this.touched = true;
    if (!wasTouched) {
      this.props.onTouch();
    }
  }

  onBlur() {
    this.setTouched();
  }

  onInput(e) {
    this.setTouched();
    this.props.onChange(e.target.value);
  }

  render() {

    // Все пропы StringInputAccessor, кроме тех, которые касаются сугубо его самого, передаются как пропы
    // содержащегося в нем input
    const inputProps = Object.assign({}, this.props);

    // В input пропускаем только те пропы, которые не относятся сугубо к StringInputAccessor
    [
      'key',
      'children',
      'onTouch',
      'onChange'
    ].forEach((propName) => {
      if (inputProps.hasOwnProperty(propName)) {
        delete inputProps[propName];
      }
    });

    // Добавляем в пропы привязки нашего текущего компонента к input
    inputProps.onBlur = this.onBlur.bind(this);
    inputProps.onInput = this.onInput.bind(this);

    inputProps.type = 'text';

    return React.createElement('input', inputProps);
  }
}

StringInputAccessor.defaultProps = {
  onTouch: () => {},
  onChange: () => {}
};

export default StringInputAccessor;
