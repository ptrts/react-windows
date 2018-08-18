import React from 'react';

import Movable from '../movable/Movable';

class Window extends React.Component {

  render() {
    return (
      <Movable style={this.props.style}>
        {this.props.children}
      </Movable>
    );
  }
}

export default Window;
