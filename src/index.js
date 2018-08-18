/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import AppComponent from './components/AppComponent';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <AppComponent/>
    </AppContainer>,
    document.getElementById('app'),
  )
};

render();

if(module.hot) {

  module.hot.accept('./components/AppComponent', () => {

    console.log('Here!');

    render();
  })
}
