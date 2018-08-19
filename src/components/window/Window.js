import React from 'react';
import store from 'store2';

import Movable from '../movable/Movable';

class Window extends React.Component {

  constructor(props) {
    super(props);

    this.leftKey = this.props.id + '.left';
    this.topKey = this.props.id + '.top';

    if (store.local.has(this.leftKey) && store.local.has(this.topKey)) {
      this.initialLeft = store.local.get(this.leftKey);
      this.initialTop = store.local.get(this.topKey);
    } else {
      this.initialLeft = this.props.initialLeft;
      this.initialTop = this.props.initialTop;
    }

    this.handleOnMoveEnd = this.handleOnMoveEnd.bind(this);
  }

  handleOnMoveEnd(e) {
    store.local.set(this.leftKey, e.left);
    store.local.set(this.topKey, e.top);
  }

  render() {
    return (
      <Movable
        style={this.props.style}
        initialLeft={this.initialLeft}
        initialTop={this.initialTop}
        onMoveEnd={this.handleOnMoveEnd}
      >
        {this.props.children}
      </Movable>
    );
  }
}

export default Window;
