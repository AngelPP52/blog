import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './react-store';
import Counter from './components/Counter';

ReactDOM.render(
  <Provider store={store}>
    <Counter></Counter>
  </Provider>,
  document.getElementById('root')
);
