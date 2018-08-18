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
        <Movable style={{width: '400px', height: '200px'}}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
