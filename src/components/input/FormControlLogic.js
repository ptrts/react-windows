import ObjectUtils from '../../util/classes/ObjectUtils';

export default class FormControlLogic {

  static onConstructor(component) {

    const newState = {

      // value, которое в пропах - это всего лишь начальное значение нашего input
      // Если после первоначального создания компонента, потом меняется этот проп value,
      // то в input это уже не попадет. После создания компонента, значение input - это сугубо внутренний стейт
      value: component.props.value,

      touched: false,
      untouched: true,
      dirty: false,
      pristine: true,
      valid: true,
      invalid: false,
      inputErrors: {},
      errors: {}
    };

    if (component.state) {
      Object.assign(component.state, newState);
    } else {
      component.state = newState;
    }

    FormControlLogic._updateValidationStateAndRunCallbacks(component, true);
  }

  static onTouch(component) {
    if (!component.state.touched) {
      component.setState({touched: true, untouched: false}, component.props.onTouched);
    }
  }

  static onChange(component, newValue, inputErrors) {

    // При каждом вводе у нас будет происходить ререндеринг нашего input
    // Ну и ладно. Это называется "making the state the only source of truth"
    component.setState({value: newValue, inputErrors: inputErrors}, () => {

      console.warn(`value = ${component.state.value}`);

      FormControlLogic._onChangeInternal(component);
    });
  }

  static onValidatorsChange(component) {
    FormControlLogic._updateValidationStateAndRunCallbacks(component);
  }

  static _setState(component, isConstructor, updaterOrStateChange, callback) {

    if (isConstructor) {

      let stateChange;
      if (typeof updaterOrStateChange === 'function') {
        stateChange = updaterOrStateChange(component.state, component.props);
      } else {
        stateChange = updaterOrStateChange;
      }

      if (stateChange) {

        if (component.state) {
          Object.assign(component.state, stateChange);
        } else {
          component.state = stateChange;
        }

        callback();
      }

    } else {
      component.setState(updaterOrStateChange, callback);
    }
  }

  static _onChangeInternal(component) {

    FormControlLogic.onTouch(component);

    if (!component.state.dirty) {
      component.setState({dirty: true, pristine: false}, component.props.onDirty);
    }

    FormControlLogic._updateValidationStateAndRunCallbacks(component);
  }

  static _validate(value, validators) {
    const compoundValidationResult = {};
    if (validators) {
      validators.forEach((validator) => {
        const validationResult = validator(value);
        if (validationResult) {
          Object.assign(compoundValidationResult, validationResult);
        }
      });
    }
    return compoundValidationResult;
  }

  static _updateValidationStateAndRunCallbacks(component, isConstructor) {

    const s = component.state;
    const p = component.props;

    let errors;

    if (ObjectUtils.isNotEmpty(s.inputErrors)) {
      errors = s.inputErrors;
    } else {
      errors = FormControlLogic._validate(s.value, p.validators);

      // Добавляем ошибки валидации от тех валидаторов, которые произошли от валидационных пропов,
      // типа pattern или minLength
      const errors2 = FormControlLogic._validate(s.value, component.validators);
      Object.assign(errors, errors2);
    }

    console.warn(`errors = ${JSON.stringify(errors, null, '\t')}`);

    const valid = !ObjectUtils.isNotEmpty(errors);

    const validityChanged = valid !== s.valid;

    FormControlLogic._setState(component, isConstructor, {valid, invalid: !valid, errors}, () => {

      const s = component.state;
      const p = component.props;

      if (validityChanged) {
        if (valid) {
          if (p.onValid) {
            p.onValid(s.value);
          }
        } else {
          if (p.onInvalid) {
            p.onInvalid(s.value, s.errors);
          }
        }

        if (p.onValidityChanged) {
          p.onValidityChanged(s.value, s.valid, s.errors);
        }
      }

      if (p.onErrorsChanged) {
        p.onErrorsChanged(s.value, s.valid, s.errors);
      }
    });
  }

  static getCallbackNames() {
    return [
      'onTouched',
      'onDirty',
      'onValid',
      'onInvalid',
      'onValidityChanged',
      'onErrorsChanged'
    ];
  }

  static getClassName(component) {

    const classes = [];

    if (component.state.touched) {
      classes.push('fw-touched');
    }
    if (component.state.untouched) {
      classes.push('fw-untouched');
    }
    if (component.state.dirty) {
      classes.push('fw-dirty');
    }
    if (component.state.pristine) {
      classes.push('fw-pristine');
    }
    if (component.state.valid) {
      classes.push('fw-valid');
    }
    if (component.state.invalid) {
      classes.push('fw-invalid');
    }

    return classes.join(' ');
  }
}
