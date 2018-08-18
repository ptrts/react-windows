/* eslint-disable */

import React from 'react';

class Movable extends React.Component {

  constructor(props) {
    super(props);

    this.handleOnDrag = this.handleOnDrag.bind(this);
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragStartCapture = this.handleOnDragStartCapture.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.handleOnDragEndCapture = this.handleOnDragEndCapture.bind(this);
  }

  handleOnDrag() {
    console.warn('handleOnDrag');
  }

  handleOnDragStart() {
    console.warn('handleOnDragStart');
  }

  handleOnDragStartCapture() {
    console.warn('handleOnDragStartCapture');
  }

  handleOnDragEnd() {
    console.warn('handleOnDragEnd');
  }

  handleOnDragEndCapture() {
    console.warn('handleOnDragEndCapture');
  }

  render() {
    return (
      <div
        style={
          Object.assign(
            {
              backgroundColor: 'Cyan',
              wordWrap: 'break-word'
            },
            this.props.style
          )
        }
        draggable={true}
        onDrag={this.handleOnDrag}
        onDragStart={this.handleOnDragStart}
        onDragStartCapture={this.handleOnDragStartCapture}
        onDragEnd={this.handleOnDragEnd}
        onDragEndCapture={this.handleOnDragEndCapture}
      >
        {this.props.children}
      </div>
    );
  }
}

Movable.defaultProps = {};

export default Movable;
