import React from 'react';
import ScheduleDropDown from '../../components/ScheduleView/ScheduleDropDown/ScheduleDropDown';
import ClientCard from '../../components/ClientCard/ClientCard';
import PrivateContext from '../../contexts/PrivateContext';
import './scheduleroute.css';

class Schedule extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.context.clients == null) {
      this.context
        .fetchClients()
        .then(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    console.log(this.context.clients);

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className='schedule-page'>
        <ScheduleDropDown />
        {this.context.clients.map((store) => (
          <ClientCard data={store} key={store.company_id} />
        ))}
      </div>
    );
  }
}

export default Schedule;
