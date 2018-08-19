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
      openWindows: {},
      minimizedWindows: {}
    };
  }

  setWindow(windows, id, window) {

    const newWindows = Object.assign({}, windows);

    if (window) {
      newWindows[id] = window;
    } else {
      delete newWindows[id];
    }

    return newWindows;
  }

  setOpenWindow(id, window) {
    this.setState({
      openWindows: this.setWindow(this.state.openWindows, id, window)
    });
  }

  setMinimizedWindow(id, window) {
    this.setState({
      minimizedWindows: this.setWindow(this.state.minimizedWindows, id, window)
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
    
    this.setOpenWindow(id, newWindow);
  }

  onMinimizeRequest(id) {

    const window = this.state.openWindows[id];

    this.setOpenWindow(id, null);
    this.setMinimizedWindow(id, window);
  }

  restore(id) {

    const window = this.state.minimizedWindows[id];

    this.setMinimizedWindow(id, null);
    this.setOpenWindow(id, window);
  }

  onCloseRequest(id) {
    this.setOpenWindow(id, null);
  }

  render() {

    const openWindowsArray = [];

    for (let k in this.state.openWindows) {
      if (this.state.openWindows.hasOwnProperty(k)) {
        const window = this.state.openWindows[k];
        openWindowsArray.push(window);
      }
    }

    const minimizedWindowIds = [];
    for (let k in this.state.minimizedWindows) {
      if (this.state.minimizedWindows.hasOwnProperty(k)) {
        minimizedWindowIds.push(k);
      }
    }

    const restoreButtons = minimizedWindowIds.map((id) =>
      <button
        key={id}
        className="fw-button"
        onClick={this.restore.bind(this, id)}
      >
        {id}
      </button>
    );

    return (
      <React.Fragment>

        <button className="fw-button" onClick={this.openWindow.bind(this, 1)}>
          Окно 1
        </button>

        <button className="fw-button" onClick={this.openWindow.bind(this, 2)}>
          Окно 2
        </button>

        <div style={{position: 'relative'}}>
          {openWindowsArray}
        </div>

        <div
          style={{
            position: 'fixed',
            bottom: 0,
            display: 'flex'
          }}
        >
          {restoreButtons}
        </div>

      </React.Fragment>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
