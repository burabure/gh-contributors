import React from 'react';

export default class SearchControls extends React.Component {
  render() {

    return (
      <div className="searchControls">
        <span>Buscar contribuidores: </span>
        <input
          type="text"
          placeholder="user/repo"
          onKeyPress={this._handleSearch.bind(this, this.props.searchCallback)} />
      </div>
    );
  }

  /**
   * Event handler for Search Query input on UI
   */
  _handleSearch(cb, event) {
    if(event.which === 13) {
      const inputField = event.target;
      cb(inputField.value);
    }
  }
}
