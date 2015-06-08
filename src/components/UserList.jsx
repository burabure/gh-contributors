import React from 'react';
import User from './User.jsx';

export default class UserList extends React.Component {
  render() {

    const users =
      !!this.props.users ?
        this.props.users
          .map(user =>
            <User
              key        = {user.id}
              userName   = {user.login}
              userUrl    = {user.url}
              email      = {user.email}
              location   = {user.location} />
          ) : false;

    return (
      <ul className="tweetList">
        <h1>UserList:</h1>

        {this.props.isLoading ?
          <h2>Loading Search Results...</h2> : false}

        {this.props.searchError ?
          <h2>Error Loading Results from "{this.props.searchError}", check that the repo exists and is correctly specified</h2> : false}

        {users}
      </ul>
    );
  }
}
