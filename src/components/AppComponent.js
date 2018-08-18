import 'normalize.css/normalize.css';
import '../styles/global/global.scss';
import './AppComponent.css';

import 'bootstrap';

import React from 'react';
import Movable from './movable/Movable';

class AppComponent extends React.Component {

  render() {
    return (
      <div>
        <div style={{width: '500px', height: '500px', backgroundColor: 'Yellow'}}/>
        <div style={{position: 'relative'}}>
          AppComponent
          <Movable style={{width: '300px', height: '100px', position: 'fixed'}}>
            <h1 className="mover">Hello</h1>
            <h2>World</h2>
          </Movable>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
