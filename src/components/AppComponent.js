import 'normalize.css/normalize.css';
import '../styles/global/global.scss';
import './AppComponent.css';

import 'bootstrap';

import React from 'react';
import Window1 from './window1/Window1';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      windowInfos: {}
    };
  }

  setWindow(id, window, minimized) {

    const newWindows = Object.assign({}, this.state.windowInfos);

    if (window) {
      newWindows[id] = {window: window, minimized: minimized};
    } else {
      delete newWindows[id];
    }

    this.setState({
      windowInfos: newWindows
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

    this.setWindow(id, newWindow, false);
  }

  onMinimizeRequest(id) {

    const window = this.state.windowInfos[id].window;

    this.setWindow(id, window, true);
  }

  restore(id) {

    const window = this.state.windowInfos[id].window;

    this.setWindow(id, window, false);
  }

  onCloseRequest(id) {
    this.setWindow(id, null);
  }

  render() {

    const openWindowsArray = [];
    const minimizedWindowIds = [];

    for (let id in this.state.windowInfos) {
      if (this.state.windowInfos.hasOwnProperty(id)) {
        const windowInfo = this.state.windowInfos[id];
        if (windowInfo.minimized) {
          minimizedWindowIds.push(id);
        } else {
          openWindowsArray.push(windowInfo.window);
        }
      }
    }

    const restoreButtons = minimizedWindowIds.map((id) => {

      const RestoreButton =
        <div key={id} className="fw-button-group-button-wrapper">
          <button
            key={id}
            className="fw-button"
            onClick={this.restore.bind(this, id)}
          >
            {id}
          </button>
        </div>;

      return RestoreButton;
    });

    return (
      <React.Fragment>

        <div className="fw-button-group">

          <div className="fw-button-group-button-wrapper">
            <button className="fw-button" onClick={this.openWindow.bind(this, 1)}>
              Окно 1
            </button>
          </div>

          <div className="fw-button-group-button-wrapper">
            <button className="fw-button" onClick={this.openWindow.bind(this, 2)}>
              Окно 2
            </button>
          </div>

        </div>

        <div style={{position: 'relative'}}>
          {openWindowsArray}
        </div>

        <div
          style={{
            position: 'fixed',
            bottom: 0
          }}
          className="fw-button-group"
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
