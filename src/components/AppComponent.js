import 'normalize.css/normalize.css';
import '../styles/global/global.scss';
import './AppComponent.css';

import 'bootstrap';

import React from 'react';
import Window from './window/Window';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.handleCloseRequest = this.handleCloseRequest.bind(this);

    this.state = {
      window1Opened: true
    };
  }

  handleCloseRequest() {
    this.setState({
      window1Opened: false
    });
  }

  render() {
    return (
      <div>
        <div style={{width: '500px', height: '500px', backgroundColor: 'Yellow'}}/>
        <div style={{position: 'relative'}}>
          AppComponent
          {
            this.state.window1Opened &&

            <Window

              id="window1"

              style={{
                minWidth: '500px',
                minHeight: '500px',
                position: 'fixed',

                // Начальная позиция окна, которая может быть изменена при перетаскивании
                // и при восстановлении из локального хранилища предыдущего положения окна
                //
                // После перетаскивания и восстановления, при перерисовке окна данные параметры
                // будут игнорироваться
                left: '500px',
                top: '500px'
              }}

              header="Заголовок окна"

              body={
                <React.Fragment>
                  <h1>Hello</h1>
                  <h2>World</h2>
                </React.Fragment>
              }

              buttons={
                <React.Fragment>
                  <button className="fw-button">
                    Дополнительная кнопка
                  </button>
                </React.Fragment>
              }

              onCloseRequest={this.handleCloseRequest}
            />
          }
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
