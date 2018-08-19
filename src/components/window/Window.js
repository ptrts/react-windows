import React from 'react';
import store from 'store2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Movable from '../movable/Movable';

class Window extends React.Component {

  constructor(props) {
    super(props);

    this.leftKey = this.props.id + '.left';
    this.topKey = this.props.id + '.top';

    if (store.local.has(this.leftKey) && store.local.has(this.topKey)) {
      this.savedLeft = store.local.get(this.leftKey);
      this.savedTop = store.local.get(this.topKey);
    }

    this.handleOnMoveEnd = this.handleOnMoveEnd.bind(this);
    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  handleOnMoveEnd(e) {
    store.local.set(this.leftKey, e.left);
    store.local.set(this.topKey, e.top);
  }

  handleCloseButton() {
    this.props.onCloseRequest();
  }

  render() {

    const styleForWindow = Object.assign(
      {
        minWidth: '300px',
        minHeight: '200px',
        position: 'fixed',
        left: '100px',
        top: '100px'
      },
      this.props.style
    );

    if (typeof this.savedLeft === 'number' && typeof this.savedTop === 'number') {
      styleForWindow.left = `${this.savedLeft}px`;
      styleForWindow.top = `${this.savedTop}px`;
    }

    const styleForMovable = {};
    [
      'position',
      'left',
      'top',
      'right',
      'bottom'
    ].forEach((name) => {
      styleForMovable[name] = styleForWindow[name];
      delete styleForWindow[name];
    });

    return (
      <Movable
        style={styleForMovable}
        onMoveEnd={this.handleOnMoveEnd}
      >

        <div className="fw-window" style={styleForWindow}>

          <div className="fw-window-header">

            <div className="fw-window-header-text mover">
              {this.props.header}
            </div>

            <div onClick={this.handleCloseButton}>
              <FontAwesomeIcon icon="times" className="fw-window-header-close-button"/>
            </div>

          </div>

          <div className="fw-window-body">
            {this.props.body}
          </div>

          <div className="fw-window-footer">

            {this.props.buttons}

            <button className="fw-window-footer-close-button fw-button" onClick={this.handleCloseButton}>
              Закрыть
            </button>

          </div>

        </div>

      </Movable>
    );
  }
}

Window.defaultProps = {
  onCloseRequest: () => {}
};

export default Window;
