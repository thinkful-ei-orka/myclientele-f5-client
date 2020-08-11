import React from 'react';
import ScheduleDropDown from '../../components/ScheduleView/ScheduleDropDown/ScheduleDropDown';
import ClientCard from '../../components/ClientCard/ClientCard';
import PrivateContext from '../../contexts/PrivateContext';
import './scheduleroute.scss';

class Schedule extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      todayOfWeek: null,
    };
  }

  componentDidMount() {
    if (this.context.clients == null) {
      this.context
        .fetchClients()
        .then(() => this.setState({ isLoading: false }));
    }

    let date = new Date();
      this.setState({todayOfWeek: date.getDay()})

    if (this.context.scheduleFilter == null) {
      this.context.setScheduleFilter(this.state.todayOfWeek)
    }
  }

  render() {
    console.log(this.context.scheduleFilter)
    let clientsFilter = this.context.clients
    if (this.context.scheduleFilter !== null) {
      clientsFilter = this.context.clients.filter(client => client.day_of_week === this.context.scheduleFilter)
      }
    
    if (this.context.clients == null) {
      return <div>Loading...</div>;
    }

    return (
      <div className='schedule-page'>
          <ScheduleDropDown today={this.state.todayOfWeek}/>
        {clientsFilter.map((store) => (
          <ClientCard data={store} key={store.id} />
        ))}
      </div>
    );
  }
}

export default Schedule;
