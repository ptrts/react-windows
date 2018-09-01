import React from 'react';
import Window from '../window/Window';
import StringInput from '../input/str/StringInput';

const validators1 = [
  (value) => {
    if (value === '123') {
      return {badValue123: true};
    }
  }
];

const validators2 = [
  (value) => {
    if (value === '123') {
      return {badValue123: true};
    }
  },
  (value) => {
    if (value === '456') {
      return {badValue456: true};
    }
  }
];

class Window1 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      validators: validators1
    };
  }

  _setValidators(validators) {
    this.setState({validators});
  }

  setValidators1() {
    this._setValidators(validators1);
  }

  setValidators2() {
    this._setValidators(validators2);
  }

  toggleStringRequired() {
    this.setState((prevState) => {
      return {stringRequired: !prevState.stringRequired};
    });
  }

  onTouched() {
    console.warn('onTouched()');
  }
  
  onDirty() {
    console.warn('onDirty()');
  }
  
  onValid(value) {
    console.warn(`onValid(value = ${value})`);
  }
  
  onInvalid(value, errors) {
    console.warn(`onInvalid(value = ${value}, errors = ${JSON.stringify(errors, null, '\t')})`);
  }
  
  onValidityChanged(value, valid, errors) {
    console.warn(`onValidityChanged(value = ${value}, valid = ${valid}, errors = ${JSON.stringify(errors, null, '\t')})`);
  }
  
  onErrorsChanged(value, valid, errors) {
    console.warn(`onErrorsChanged(value = ${value}, valid = ${valid}, errors = ${JSON.stringify(errors, null, '\t')})`);
  }

  render() {
    return (
      <Window

        id={this.props.id}

        style={{
          minWidth: '500px',
          minHeight: '500px',
          position: 'fixed',

          // Начальная позиция окна, которая может быть изменена при перетаскивании
          // и при восстановлении из локального хранилища предыдущего положения окна
          //
          // После перетаскивания и восстановления, при перерисовке окна данные параметры
          // будут игнорироваться
          left: '100px',
          top: '100px'
        }}

        header={'Заголовок окна ' + this.props.id}

        body={
          <StringInput
            width="10"
            required={this.state.stringRequired ? '' : undefined}
            minLength="3"
            pattern="^[0-9]*$"
            validators={this.state.validators}
            onTouched={this.onTouched.bind(this)}
            onDirty={this.onDirty.bind(this)}
            onValid={this.onValid.bind(this)}
            onInvalid={this.onInvalid.bind(this)}
            onValidityChanged={this.onValidityChanged.bind(this)}
            onErrorsChanged={this.onErrorsChanged.bind(this)}
          />
        }

        buttons={
          <React.Fragment>
            <button className="fw-button" onClick={this.setValidators1.bind(this)}>
              Валидаторы 1
            </button>
            <button className="fw-button" onClick={this.setValidators2.bind(this)}>
              Валидаторы 2
            </button>
            <button className="fw-button" onClick={this.toggleStringRequired.bind(this)}>
              required = {this.state.stringRequired ? 'false' : 'true'}
            </button>
          </React.Fragment>
        }

        onMinimizeRequest={this.props.onMinimizeRequest}
        onCloseRequest={this.props.onCloseRequest}

        visible={this.props.visible}
      />
    );
  }
}

Window1.defaultProps = {
  onCloseRequest: () => {},
  onMinimizeRequest: () => {}
};

export default Window1;
