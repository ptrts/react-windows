import React from 'react';
import store from 'store2';

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
  }

  handleOnMoveEnd(e) {
    store.local.set(this.leftKey, e.left);
    store.local.set(this.topKey, e.top);
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

          <div className="fw-window-header mover">

            {this.props.header}

            <div className="fw-window-header-close-button"/>

          </div>

          <div className="fw-window-body">
            {this.props.body}
          </div>

          <div className="fw-window-footer">

            {this.props.buttons}

            <div className="fw-button">
              Закрыть
            </div>

          </div>

        </div>

      </Movable>
    );
  }
}

export default Window;
