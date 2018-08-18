import 'normalize.css/normalize.css';
import '../styles/global/global.scss';
import './AppComponent.css';

import 'bootstrap';

import React from 'react';

class AppComponent extends React.Component {

  render() {
    return (

      <div>
        AppComponent
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
