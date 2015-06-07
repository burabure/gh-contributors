import 'babel-core/polyfill';
import {get, getUsersProfiles} from './utils/githubApi.js';
import R from 'ramda';

const getUserNames = R.map(R.prop('login'));
const showUser     = R.project(['login', 'location']);

get('repos/eslint/eslint/contributors')
  .then( xs => getUsersProfiles(getUserNames(xs)) )
  .then( xs => {
    window.res = xs;
    window.users = showUser(xs);
    console.table( showUser(xs) );
  });

window.R = R;

/*
const React = require('react');
const App = require('./components/App.jsx');

React.render(
  <App />,
  document.getElementById('appRoot')
);
*/
