import React from 'react';
import {get, getUsersProfiles} from '../utils/githubApi.js';
import R from 'ramda';
import SearchControls from './SearchControls.jsx';
import UserList from './UserList.jsx';


const _getUserNames      = R.map(R.prop('login'));
const _usersWithLocation = R.filter(x => !!x.location);

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      users          : [],
      isLoadingSearch: false,
      searchError    : false
    };
  }

  render() {
    return (
      <div className="app">
        <SearchControls
          searchCallback = {this._handleNewSearch.bind(this)} />
        <UserList
          isLoading   = {this.state.isLoadingSearch}
          searchError = {this.state.searchError}
          users       = {this.state.users} />
      </div>
    );
  }

  _handleNewSearch(repo) {
    this.setState({
      searchError    : false,
      isLoadingSearch: true
    });

    get(`repos/${repo}/contributors`)
      .then( xs => xs ? getUsersProfiles(_getUserNames(xs)) : false )
      .then( xs => {
        this.setState({
          users          : xs ? _usersWithLocation(xs) : false,
          isLoadingSearch: false,
          searchError    : !xs ? repo : false
        });
      });
  }
}
