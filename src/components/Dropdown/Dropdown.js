import React from 'react';
const arrowDown = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='icon icon-tabler icon-tabler-arrow-down'
    width='20'
    height='20'
    viewBox='0 0 24 24'
    strokeWidth='1.5'
    stroke='#2c3e50'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <line x1='12' y1='5' x2='12' y2='19' />
    <line x1='18' y1='13' x2='12' y2='19' />
    <line x1='6' y1='13' x2='12' y2='19' />
  </svg>
);

const arrowUp = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='icon icon-tabler icon-tabler-arrow-up'
    width='20'
    height='20'
    viewBox='0 0 24 24'
    strokeWidth='1.5'
    stroke='#2c3e50'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <line x1='12' y1='5' x2='12' y2='19' />
    <line x1='18' y1='11' x2='12' y2='5' />
    <line x1='6' y1='11' x2='12' y2='5' />
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
          {this.state.dropdownTitle} {this.state.listOpen ? arrowDown : arrowUp}
        </div>
        {this.state.listOpen ? this.handleListOpen() : ''}
      </div>
    );
  }
}

export default ScheduleDropDown;
