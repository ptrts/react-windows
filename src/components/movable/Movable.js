import React from 'react';

class Movable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={
        Object.assign(
          {
            backgroundColor: 'Cyan',
            wordWrap: 'break-word'
          },
          this.props.style
        )
      }>
        Movable: {JSON.stringify(this.props.style)}
      </div>
    );
  }
}

Movable.defaultProps = {};

export default Movable;
