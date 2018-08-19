import React from 'react';
import Window from '../window/Window';

class Window1 extends React.Component {

  render() {
    return (
      <Window

        id={this.props.id}

        style={{
          minWidth: '500px',
          minHeight: '500px',
          position: 'fixed',

          // Начальная позиция окна, которая может быть изменена при перетаскивании
          // и при восстановлении из локального хранилища предыдущего положения окна
          //
          // После перетаскивания и восстановления, при перерисовке окна данные параметры
          // будут игнорироваться
          left: '100px',
          top: '100px'
        }}

        header={'Заголовок окна ' + this.props.id}

        body={'Содержимое окна ' + this.props.id}

        buttons={
          <React.Fragment>
            <button className="fw-button">
              Дополнительная кнопка
            </button>
          </React.Fragment>
        }

        onCloseRequest={this.props.onCloseRequest}
      />
    );
  }
}

Window1.defaultProps = {
  onCloseRequest: () => {}
};

export default Window1;
