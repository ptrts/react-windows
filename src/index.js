/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import App from './components/Main';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app'),
  )
};

render(App);

if(module.hot) {

  module.hot.accept('./components/Main', () => {

    console.log('Here!');

    render(App);
  })
}
