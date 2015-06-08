import React from 'react';

export default class Tweet extends React.Component {
  render() {
    return (
      <li>
        <h2><a href={this.props.userUrl}>{this.props.userName}</a></h2> <h3>{this.props.location}</h3>
        <h3>{this.props.email}</h3>

      </li>
    );
  }
}
