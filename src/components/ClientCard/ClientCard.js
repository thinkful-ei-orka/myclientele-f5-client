import React from 'react';
const dotOpen = (
  <svg height='100' width='100'>
    <circle
      cx='50'
      cy='50'
      r='40'
      stroke='none'
      strokeWidth='3'
      fill='#64bf49'
    />
  </svg>
);
const dotClosed = (
  <svg height='100' width='100'>
    <circle
      cx='50'
      cy='50'
      r='40'
      stroke='none'
      strokeWidth='3'
      fill='#cc3737'
    />
  </svg>
);

const moreInfoButton = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    class='icon icon-tabler icon-tabler-dots-circle-horizontal'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    stroke-width='1.5'
    stroke='#2c3e50'
    fill='none'
    stroke-linecap='round'
    stroke-linejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <circle cx='12' cy='12' r='9' />
    <line x1='8' y1='12' x2='8' y2='12.01' />
    <line x1='12' y1='12' x2='12' y2='12.01' />
    <line x1='16' y1='12' x2='16' y2='12.01' />
  </svg>
);
const editButton = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    class='icon icon-tabler icon-tabler-edit'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    stroke-width='1.5'
    stroke='#2c3e50'
    fill='none'
    stroke-linecap='round'
    stroke-linejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />
    <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />
    <line x1='16' y1='5' x2='19' y2='8' />
  </svg>
);

class ClientCard extends React.Component {
  render() {
    const {
      name,
      location,
      currently_closed,
      day_of_week,
      general_manager,
      hours_of_operation,
      notes,
    } = this.props.data;
    console.log(this.props.data);
    const isClosedSignal = () => {
      if (currently_closed) {
        return dotClosed;
      } else {
        return dotOpen;
      }
    };

    //TODO: Have Sherry add more clients to the seed files
    //TODO:Need either last_modified or use day_of_week to determine last visited

    return (
      <div className='schedule-card'>
        <div className='logo'>
          <img src='https://via.placeholder.com/150' alt={name} />
        </div>
        <div className='information-area'>
          <h2>{name} </h2>
          <div className='location'>{location}</div>
          <div className='currently-closed'>
            {isClosedSignal()}
            {hours_of_operation}{' '}
          </div>
        </div>
        <div className='button-area'>
          <div className='edit-button'>{editButton}</div>
          <div className='more-info'>{moreInfoButton}</div>
        </div>
      </div>
    );
  }
}

export default ClientCard;
