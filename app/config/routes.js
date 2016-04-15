import { Router, Route, IndexRoute, Link } from 'react-router'
import React from 'react';

//var React = require('react');

import Main from '../components/Main'
import Home from '../components/Home'
import Editor from '../components/Editor'

//var Main = require('../components/Main');
//var Home = require('../components/Home');
//var Route = require('react-router').Route;

module.exports = (
  <Route path="/" component={Main}>
     <Route path="scenario/:scenarioid" component={Editor} />
     <IndexRoute component={Home} />
  </Route>
);
