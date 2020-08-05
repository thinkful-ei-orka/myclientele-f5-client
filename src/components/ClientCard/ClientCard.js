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
        <h2>{name} </h2>
        <div className='location'>{location}</div>
        <div className='currently_closed'>
          {isClosedSignal()} {hours_of_operation}{' '}
        </div>
      </div>
    );
  }
}

export default ClientCard;
