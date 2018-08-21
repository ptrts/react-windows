import 'normalize.css/normalize.css';
import '../styles/global/global.scss';
import './AppComponent.css';

import 'bootstrap';

import React from 'react';
import Window1 from './window1/Window1';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      windowInfos: {}
    };
  }

  setWindowInfo(id, minimized) {

    const newWindowInfos = Object.assign({}, this.state.windowInfos);

    if (typeof minimized === 'boolean') {
      newWindowInfos[id] = {minimized: minimized};
    } else {
      delete newWindowInfos[id];
    }

    this.setState({
      windowInfos: newWindowInfos
    });
  }

  openWindow(id) {
    this.setWindowInfo(id, false);
  }

  minimize(id) {
    this.setWindowInfo(id, true);
  }

  restore(id) {
    this.setWindowInfo(id, false);
  }

  close(id) {
    this.setWindowInfo(id, null);
  }

  render() {

    const windows = [];
    const restoreButtons = [];
    for (let id in this.state.windowInfos) {
      if (this.state.windowInfos.hasOwnProperty(id)) {

        const windowInfo = this.state.windowInfos[id];

        const window =
          <Window1
            id={id}
            key={id}
            onMinimizeRequest={this.minimize.bind(this, id)}
            onCloseRequest={this.close.bind(this, id)}
            visible={!windowInfo.minimized}
          />;

        windows.push(window);

        if (windowInfo.minimized) {

          const RestoreButton =
            <div key={id} className="fw-button-group-button-wrapper">
              <button
                className="fw-button"
                onClick={this.restore.bind(this, id)}
              >
                {id}
              </button>
              <button className="fw-button" onClick={this.close.bind(this, id)}>
                <FontAwesomeIcon icon="times"/>
              </button>
            </div>;

          restoreButtons.push(RestoreButton);
        }
      }
    }

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
          {windows}
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
