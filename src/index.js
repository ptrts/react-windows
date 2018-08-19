/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import AppComponent from './components/AppComponent';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes);

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
