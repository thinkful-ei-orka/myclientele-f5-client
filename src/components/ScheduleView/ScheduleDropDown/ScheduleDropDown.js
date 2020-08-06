import React from 'react';
const arrow = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='icon icon-tabler icon-tabler-direction'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='1.5'
    stroke='#2c3e50'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M9 10l3 -3l3 3' />
    <path d='M9 14l3 3l3 -3' />
  </svg>
);

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
          {this.state.dropdownTitle} {arrow}
        </div>
        {this.state.listOpen ? this.handleListOpen() : ''}
      </div>
    );
  }
}

export default ScheduleDropDown;
