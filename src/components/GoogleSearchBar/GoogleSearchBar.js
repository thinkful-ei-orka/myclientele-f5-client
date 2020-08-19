import React from 'react';
import './GoogleSearchBar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class GoogleSearchBar extends React.Component {
  render() {
    return (
      <form onSubmit={(e) => this.props.handleSearch(e)}>
        <input
          type='search'
          name='search'
          placeholder='Search'
          aria-label='Search for clients'
          onChange={(e) => this.props.handleChange(e)}
        />
        <button className='search-button' type='submit'>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </button>
      </form>
    );
  }
}

export default GoogleSearchBar;
