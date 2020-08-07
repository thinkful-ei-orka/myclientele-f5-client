import React from 'react';
import arrow from '../../../images/arrow.svg';

class ScheduleDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      dropdownTitle: 'Defaults to today',
    };
  }

  testList = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
  };

  handleClickOutside = () => {
    this.setState({ listOpen: false });
  };

  toggleList = () => {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
    }));
  };

  handleListOpen = () => {
    return (
      <div className='dropdown-list'>
        {Object.entries(this.testList).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className='schedule-drop-down'>
        <div className='dropdown-title' onClick={() => this.toggleList()}>
          {' '}
          {this.state.dropdownTitle}
          <img src={arrow} alt='drop down arrow' />
        </div>
        {this.state.listOpen ? this.handleListOpen() : ''}
      </div>
    );
  }
}

export default ScheduleDropDown;
