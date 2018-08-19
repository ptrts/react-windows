import 'normalize.css/normalize.css';
import '../styles/global/global.scss';
import './AppComponent.css';

import 'bootstrap';

import React from 'react';
import Window1 from './window1/Window1';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.onCloseRequest = this.onCloseRequest.bind(this);
    this.openWindow = this.openWindow.bind(this);

    this.state = {
      window1Opened: true,
      windows: {}
    };
  }

  setWindow(id, window) {

    const newWindowsObject = Object.assign({}, this.state.windows);

    if (window) {
      newWindowsObject[id] = window;
    } else {
      delete newWindowsObject[id];
    }

    this.setState({
      windows: newWindowsObject
    });
  }

  openWindow(id) {
    
    const newWindow =
      <Window1
        id={id}
        key={id}
        onMinimizeRequest={this.onMinimizeRequest.bind(this, id)}
        onCloseRequest={this.onCloseRequest.bind(this, id)}
      />;
    
    this.setWindow(id, newWindow);
  }

  onMinimizeRequest(id) {
    this.setWindow(id, null);
  }

  onCloseRequest(id) {
    this.setWindow(id, null);
  }

  render() {

    const windowsArray = [];

    for (let k in this.state.windows) {
      if (this.state.windows.hasOwnProperty(k)) {
        const window = this.state.windows[k];
        windowsArray.push(window);
      }
    }

    return (
      <React.Fragment>

        <button className="fw-button" onClick={this.openWindow.bind(this, 1)}>
          Окно 1
        </button>

        <button className="fw-button" onClick={this.openWindow.bind(this, 2)}>
          Окно 2
        </button>

        <div style={{position: 'relative'}}>
          {windowsArray}
        </div>

      </React.Fragment>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
