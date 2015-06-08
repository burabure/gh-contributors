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
      isLoadingSearch: false
    };
  }

  render() {
    return (
      <div className="app">
        <SearchControls
          searchCallback = {this._handleNewSearch.bind(this)} />
        <UserList
          isLoading = {this.state.isLoadingSearch}
          users     = {this.state.users} />
      </div>
    );
  }

  _handleNewSearch(repo) {
    this.setState({isLoadingSearch: true});

    get(`repos/${repo}/contributors`)
      .then( xs => getUsersProfiles(_getUserNames(xs)) )
      .then( xs => {
        console.log(_usersWithLocation(xs));
        this.setState({
          users          : _usersWithLocation(xs),
          isLoadingSearch: false
        });
      });
  }
}
