import React from 'react';
import PrivateContext from '../../../contexts/PrivateContext';

class ScheduleSearch extends React.Component {
  static contextType = PrivateContext;

  handleSearchChange = (e) => {
    this.context.setScheduleSearch(e.target.value)
  }

  render() {
    return (
      <div className='dropdown-search'>
        <input type='search' placeholder='Search Here' onChange={this.handleSearchChange}></input>
      </div>
    );
  }
}

export default ScheduleSearch;
