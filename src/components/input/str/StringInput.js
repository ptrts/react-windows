import React from 'react';
import FormControlLogic from '../FormControlLogic';
import TextValidators from './validators/TextValidators';

class StringInput extends React.Component {

  constructor(props) {
    super(props);

    this._updateInternalValidators();

    FormControlLogic.onConstructor(this);
  }

  onBlur() {
    FormControlLogic.onTouch(this);
  }

  onInput(e) {

    const element = e.target;

    const newValue = element.value;
    const inputErrors = {};

    // console.warn(`newValue = ${newValue}`);

    FormControlLogic.onChange(this, newValue, inputErrors);
  }

  componentDidUpdate(prevProps) {

    const propsValidatorsChanged = this.props.validators !== prevProps.validators;

    const validationAttributesChanged =
      this.props.pattern !== prevProps.pattern ||
      this.props.minLength !== prevProps.minLength ||
      this.props.required !== prevProps.required;

    if (propsValidatorsChanged || validationAttributesChanged) {

      if (validationAttributesChanged) {
        this._updateInternalValidators();
      }

      FormControlLogic.onValidatorsChange(this);
    }
  }

  render() {

    // Все пропы StringInput, кроме тех, которые касаются сугубо его самого, передаются как пропы
    // содержащегося в нем input
    const inputProps = Object.assign({}, this.props);

    const callbackNames = FormControlLogic.getCallbackNames();

    // В input пропускаем только те пропы, которые не относятся сугубо к StringInput
    [
      'key',
      'children',
      'validators',
      'value',
      ...callbackNames
    ].forEach((propName) => {
      if (inputProps.hasOwnProperty(propName)) {
        delete inputProps[propName];
      }
    });

    // Добавляем в пропы привязки нашего текущего компонента к input
    inputProps.onBlur = this.onBlur.bind(this);
    inputProps.onInput = this.onInput.bind(this);

    inputProps.type = 'text';
    inputProps.value = this.state.value;

    inputProps.className = FormControlLogic.getClassName(this);

    return React.createElement('input', inputProps);
  }

  _updateInternalValidators() {

    console.warn('_updateInternalValidators()');

    const validators  = [];

    if (this.props.pattern) {
      console.warn('_updateInternalValidators() / pattern');
      validators.push(TextValidators.pattern(this.props.pattern));
    }

    if (this.props.minLength) {
      console.warn('_updateInternalValidators() / minLength');
      validators.push(TextValidators.minLength(this.props.minLength));
    }

    if (this.props.required !== undefined) {
      console.warn('_updateInternalValidators() / required');
      validators.push(TextValidators.required());
    }

    this.validators = validators;
  }
}

StringInput.defaultProps = {
  validators: [],
  value: '',
  onInvalid: () => {}
};

export default StringInput;
