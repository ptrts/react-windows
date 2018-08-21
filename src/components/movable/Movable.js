import React from 'react';

class Movable extends React.Component {

  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);

    this.state = {};
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

    let element = this.ref.current;

    let boundingClientRect = element.getBoundingClientRect();
    this.startClientLeft = boundingClientRect.left;
    this.startClientTop = boundingClientRect.top;
    this.startClientRight = boundingClientRect.right;
    this.startClientBottom = boundingClientRect.bottom;

    // В итоге, нам нужно будет сдвинуть наш большой div, при помощи установки ему left и top в пикселях.
    // Изначально left и top могут быть установлены в чем угодно, например, в процентах.
    // Перед началом перетаскивания, нам нужно выяснить значения пиксельных left и top, соответствующих положению
    // нашего div перед перетаскиванием.
    //
    // Для этого нужно выяснить, от какой точки в принципе откладываются эти left и top
    let style = window.getComputedStyle(element);
    this.position = style.getPropertyValue('position');
    if (this.position === 'absolute') {

      // Относительно ближайшего спозиционированного предка

      this.startPixelLeft = element.offsetLeft;
      this.startPixelTop = element.offsetTop;

    } else if(this.position === 'fixed') {

      // Относительно окна браузера

      this.startPixelLeft = this.startClientLeft;
      this.startPixelTop = this.startClientTop;

    } else {
      throw new Error(`Unexpected position ${this.position}`);
    }

    // Запоминаем позицию мышки в начале перетаскивания
    this.startMouseClientX = e.clientX;
    this.startMouseClientY = e.clientY;
  }

  handleOnMouseMove(e) {

    // Насколько пикселей мы сдвинули мышку
    let dX = e.clientX - this.startMouseClientX;
    let dY = e.clientY - this.startMouseClientY;

    // Скорректировать позицию по оси X

    let uncorrectedLeft = this.startClientLeft + dX;
    let uncorrectedRight = this.startClientRight + dX;
    let uncorrectedTop = this.startClientTop + dY;
    let uncorrectedBottom = this.startClientBottom + dY;
    
    if (uncorrectedLeft < 0) {
      dX = dX - uncorrectedLeft;
    } else if (uncorrectedRight > window.innerWidth) {
      dX = dX - (uncorrectedRight - window.innerWidth);
    }
    
    if (uncorrectedTop < 0) {
      dY = dY - uncorrectedTop;
    } else if (uncorrectedBottom > window.innerHeight) {
      dY = dY - (uncorrectedBottom - window.innerHeight);
    }

    this.setState({
      left: this.startPixelLeft + dX,
      top: this.startPixelTop + dY
    });
  }

  render() {

    const style = Object.assign(

      // Значения по-умолчанию
      {
        wordWrap: 'break-word',
        position: 'absolute'
      },

      // Значения, переданные нам извне
      this.props.style
    );

    if (typeof this.state.left && typeof this.state.top === 'number') {
      style.left = `${this.state.left}px`;
      style.top = `${this.state.top}px`;
    }


    if (!this.props.visible) {
      style.display = 'none';
    }

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
      this.setupMover(element);
    }
  }

  setupMover(mover) {
    mover.onmousedown = this.handleOnMouseDown;
    mover.style['user-select'] = 'none';
  }
}

Movable.defaultProps = {
  onMoveEnd: () => {},
  visible: true
};

export default Movable;
