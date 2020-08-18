import React from 'react';
import ScheduleDropDown from '../../components/ScheduleView/ScheduleDropDown/ScheduleDropDown';
import ClientCard from '../../components/ClientCard/ClientCard';
import PrivateContext from '../../contexts/PrivateContext';
import './scheduleroute.scss';

import GoogleMap from '../../components/GoogleMap/GoogleMap';
import ListMapToggle from '../../components/ListMapToggle/ListMapToggle';

export default class ScheduleRoute extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      todayOfWeek: null,
      center: null,
      listClass: '',
      mapClass: 'mobile-hidden',
    };
  }

  setCenter = (center) => {
    this.setState({
      center: center,
    });
  };

  listClick = () => {
    this.setState({
      listClass: '',
      mapClass: 'mobile-hidden',
    });
  };

  mapClick = () => {
    this.setState({
      listClass: 'mobile-hidden',
      mapClass: '',
    });
  };

  componentDidMount() {
    if (this.context.clients == null) {
      this.context
        .fetchClients()
        .then(() => this.setState({ isLoading: false }));
    }

    let date = new Date();
    this.setState({ todayOfWeek: date.getDay() });

    // if (this.context.scheduleFilter == null) {
    //   this.context.setScheduleFilter(this.state.todayOfWeek)
    //   console.log(this.context.scheduleFilter)
    //}
  }

  render() {
    if (this.context.clients == null) {
      return <div>Loading...</div>;
    }

    let clientsFilter = this.context.clients.filter(
      (client) => {
        return client.day_of_week === Number(this.state.todayOfWeek)
      });

    if (this.context.scheduleFilter) {
      clientsFilter = this.context.clients.filter(
        (client) => {
          return client.day_of_week === Number(this.context.scheduleFilter)
        });
    }

    if (this.context.scheduleSearch) {
      const searchTerm = this.context.scheduleSearch.toLowerCase();
      clientsFilter = clientsFilter.filter((client) =>
        client.name.toLowerCase().includes(searchTerm)
      );
    }

    return (
      <>
        <div className={`map-container ${this.state.mapClass}`}>
          <GoogleMap
            markers={clientsFilter}
            setCenter={this.setCenter}></GoogleMap>
        </div>
        <div className={`schedule-page ${this.state.listClass}`}>
          <ScheduleDropDown today={this.state.todayOfWeek} />
          <div className='client-cards'>
            {clientsFilter.map((store) => (
              <ClientCard data={store} key={store.id} />
            ))}
          </div>
        </div>
        <ListMapToggle
          listClick={this.listClick}
          mapClick={this.mapClick}></ListMapToggle>
      </>
    );
  }
}
