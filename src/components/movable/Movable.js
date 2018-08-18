/* eslint-disable */

import React from 'react';

class Movable extends React.Component {

  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);

    // Значения стейта по-умолчанию
    this.state = {
      top: '100px',
      left: '100px',
    };

    // Из стиля, переданного через пропы, достаем top и left, которые у нас будут на самом деле не часть пропа, а
    // которые будут частью нашего стейта
    // Значения этих свойств, переданные через пропы - это будут всего-навсего начальные значения нашего стейта
    // При обновлении пропов, перед последующими вызовами метода render, top и left, переданные в пропах будут
    // уже игнорироваться. Вместо них будут браться соответствующие значения из стейта.
    if (this.props.style) {
      if (this.props.style.hasOwnProperty('top')) {
        this.state.top = this.props.style.top;
      }
      if (this.props.style.hasOwnProperty('left')) {
        this.state.left = this.props.style.left;
      }
    }
  }

  handleOnMouseUp() {
    document.onmouseup = null;
    document.onmousemove = null;
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

Movable.defaultProps = {};

export default Movable;
