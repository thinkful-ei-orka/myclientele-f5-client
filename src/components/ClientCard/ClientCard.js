import React from 'react';
import { Link } from 'react-router-dom';
import closedsvg from '../../images/clientcard/closed.svg';
import opensvg from '../../images/clientcard/open.svg';
import editsvg from '../../images/clientcard/edit.svg';
import moreinfosvg from '../../images/clientcard/moreinfo.svg';
import edit2 from '../../images/clientcard/edit2.svg';
import OpenOrClosed from './OpenOrClosed';

class ClientCard extends React.Component {
  render() {
    const closed = (
      <svg height='30' width='30'>
        <circle
          cx='20'
          cy='20'
          r='10'
          stroke='none'
          strokeWidth='3'
          fill='#cc3737'
        />
      </svg>
    );
    const open = (
      <svg height='30' width='30'>
        <circle
          cx='20'
          cy='20'
          r='10'
          stroke='none'
          strokeWidth='3'
          fill='#64bf49'
        />
      </svg>
    );
    const {
      name,
      location,
      currently_closed,
      day_of_week,
      general_manager,
      hours_of_operation,
      notes,
    } = this.props.data;
    // console.log(this.props.data);
    //TODO: Create function to handle the visually hidden portion for screen readers

    return (
      <div className='schedule-card'>
        <div className='company-logo'>
          <img src='https://via.placeholder.com/150' alt={name} />
        </div>
        <div className='information-area'>
          <h2>{name} </h2>
          <div className='location'>{location}</div>

          <OpenOrClosed
            currently_closed={currently_closed}
            hours_of_operation={hours_of_operation}
          />
        </div>
        <div className='button-area'>
          <Link
            to={{
              pathname: '/take-report',
              state: {
                key: this.props.key,
                data: this.props.data,
              },
            }}>
            <button className='edit-button  '>
              <img src={editsvg} alt='edit button' />
            </button>
          </Link>
          <button className='more-info  '>
            <img src={moreinfosvg} alt='more info button' />
          </button>
        </div>
      </div>
    );
  }
}

export default ClientCard;
