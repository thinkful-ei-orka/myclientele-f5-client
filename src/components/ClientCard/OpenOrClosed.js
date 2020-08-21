import React from 'react';

const handleHoursOfOperation = (props) => {
  const { currently_closed, hours_of_operation } = props;
  if (currently_closed) {
    return (
      <p className='client-hours closed'>
        <span>{hours_of_operation}</span>{' '}
        <span className='visually-hidden'>and currently closed</span>
      </p>
    );
  } else {
    return (
      <p className='client-hours open'>
        <span>{hours_of_operation}</span>{' '}
        <span className='visually-hidden'>and currently open</span>
      </p>
    );
  }
};

export default handleHoursOfOperation;
