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
        AppComponent
        <Movable style={{width: '400px', height: '200px'}}>
          <h1>Hello</h1>
          <h2>World</h2>
        </Movable>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
