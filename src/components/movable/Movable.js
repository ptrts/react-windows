/* eslint-disable */

import React from 'react';

class Movable extends React.Component {

  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);

    // Устанавливаем начальное положение окна
    this.state = {
      left: this.props.initialLeft ? this.props.initialLeft : '100px',
      top: this.props.initialTop ? this.props.initialTop : '100px'
    };
  }

  handleOnMouseUp() {
    document.onmouseup = null;
    document.onmousemove = null;
    this.props.onMoveEnd({left: this.state.left, top: this.state.top});
  }

  handleOnMouseDown(e) {

    e.preventDefault();

    document.onmouseup = this.handleOnMouseUp;
    document.onmousemove = this.handleOnMouseMove;

    this.setupStartCoordinates(e);
  }

  setupStartCoordinates(e) {

    // Ищем точку отсчета, соответствующую типу позициионирования главного div нашего компонента
    let element = this.ref.current;
    let style = window.getComputedStyle(element);
    let position = style.getPropertyValue('position');
    if(position === 'absolute') {

      // Относительно ближайшего спозиционированного предка

      this.refX = element.offsetLeft;
      this.refY = element.offsetTop;

    } else if(position === 'fixed') {

      // Относительно окна браузера

      let boundingClientRect = element.getBoundingClientRect();
      this.refX = boundingClientRect.x;
      this.refY = boundingClientRect.y;

    } else {
      throw new Error(`Unexpected position ${position}`);
    }

    // Запоминаем позицию мышки в начале перетаскивания
    this.startMouseClientX = e.clientX;
    this.startMouseClientY = e.clientY;
  }

  handleOnMouseMove(e) {

    // Насколько пикселей мы сдвинули мышку
    const dX = e.clientX - this.startMouseClientX;
    const dY = e.clientY - this.startMouseClientY;

    this.setState({
      left: `${this.refX + dX}px`,
      top: `${this.refY + dY}px`,
    });
  }

  render() {

    const style = Object.assign(

      // Значения по-умолчанию
      {
        backgroundColor: 'Cyan',
        wordWrap: 'break-word',
        position: 'absolute',
        width: '400px',
        height: '200px',
      },

      // Значения, переданные нам извне
      this.props.style,

      // Значения из нашего внутреннего стейта
      {
        top: this.state.top,
        left: this.state.left
      }
    );

    return (
      <div
        ref={this.ref}
        style={style}
      >
        {this.props.children}
      </div>
    );
  }

  componentDidMount() {

    let element = this.ref.current;

    const movers = element.querySelectorAll('.mover');

    if (movers && movers.length) {
      for (let i = 0; i < movers.length; i++) {
        const mover = movers[i];
        this.setupMover(mover);
      }
    } else {
      this.setupMover(mover);
    }
  }

  setupMover(mover) {
    mover.onmousedown = this.handleOnMouseDown;
    mover.style['user-select'] = 'none';
  }
}

Movable.defaultProps = {
  onMoveEnd: () => {}
};

export default Movable;
