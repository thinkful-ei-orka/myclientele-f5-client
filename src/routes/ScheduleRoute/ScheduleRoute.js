import React from 'react';
import ScheduleDropDown from '../../components/ScheduleView/ScheduleDropDown/ScheduleDropDown';
import ClientCard from '../../components/ClientCard/ClientCard';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfStores: [
        {
          id: 1,
          name: 'Walgreens',
          address: '123 blah Rd. Phoenix, AZ 85308',
          operation: 'need this data',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Walgreens',
          address: '456 whoa Rd. Scottsdale, AZ 85308',
          operation: 'need this data',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          name: 'Walgreens',
          address: '789 bang bang Rd. Tuscon, AZ 85308',
          operation: 'need this data',
          image: 'https://via.placeholder.com/150',
        },
      ],
    };
  }
  render() {
    return (
      <>
        <ScheduleDropDown />
        {this.state.listOfStores.map((store) => (
          <ClientCard data={store} key={store.id} />
        ))}
      </>
    );
  }
}

export default Schedule;
