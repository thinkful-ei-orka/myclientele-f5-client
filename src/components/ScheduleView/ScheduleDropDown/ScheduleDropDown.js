import React from 'react';
import arrow from '../../../images/arrow.svg';
import PrivateContext from '../../../contexts/PrivateContext';

class ScheduleDropDown extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      dropdownTitle: 'Today',
    };
  }

  dayOfWeekList = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  handleClickOutside = () => {
    this.setState({ listOpen: false });
  };

  toggleList = () => {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
    }));
  };

  handleFilterChange = (e) => {
    let filterValue = e.target.value
    this.context.setScheduleFilter(filterValue)
  };

  handleSearchChange = (e) => {
    this.context.setScheduleSearch(e.target.value)
  }

  render() {
    // console.log(this.props.today)
    return (
      <div className='schedule-drop-down'>
        <div className='dropdown-title' onClick={() => this.toggleList()}>
          Filter:
          <img src={arrow} alt='drop down arrow' />
        </div>
        <select className='filter-dropdown-list' defaultValue={this.props.today} onChange={this.handleFilterChange}>
          <option key={7} value={7}>No Filter</option>
          {Object.entries(this.dayOfWeekList).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        <input type='search' onChange={this.handleSearchChange}></input>
      </div>
    );
  }
}

export default ScheduleDropDown;
