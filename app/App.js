import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import { Provider } from 'react-redux'

import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './configureStore'

import routes from './config/routes';

const store = configureStore();

render((
  <Provider store={store}>
  <Router history={hashHistory}>{routes}</Router>
  </Provider>
),document.getElementById('app'))
