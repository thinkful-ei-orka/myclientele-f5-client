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
    console.log(e.target.value)
    this.context.setScheduleFilter(e.target.value)
  };

  render() {
    console.log(this.props.today)
    return (
      <div className='schedule-drop-down'>
        <div className='dropdown-title' onClick={() => this.toggleList()}>
          Filter: {this.state.dropdownTitle}
          <img src={arrow} alt='drop down arrow' />
        </div>
        <select className='filter-dropdown-list'onChange={this.handleFilterChange}>
          <option key={7} value={null}>No Filter</option>
          {Object.entries(this.dayOfWeekList).map(([key, value]) => (
            <option key={key} value={key} {...key != this.props.today ? value : 'Today'}>{value}</option>
          ))}
        </select>
        <input type='search'></input>
      </div>
    );
  }
}

export default ScheduleDropDown;
