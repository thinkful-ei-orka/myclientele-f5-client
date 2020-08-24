import React from 'react';
import PrivateContext from '../../../contexts/PrivateContext';
import ScheduleSearch from '../ScheduleSearch/ScheduleSearch';

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
    return (
      <div className='schedule-drop-down'>
        <div className='dropdown-filter' onClick={() => this.toggleList()}>
            Filter:
          <select className='filter-dropdown-list' defaultValue={this.props.today} onChange={this.handleFilterChange}>
            {Object.entries(this.dayOfWeekList).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
            <option key={7} value={7}>All Clients</option>
          </select>
        </div>
        <ScheduleSearch />
      </div>
    );
  }
}

export default ScheduleDropDown;
