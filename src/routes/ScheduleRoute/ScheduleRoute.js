import React from 'react';
import ScheduleDropDown from '../../components/ScheduleView/ScheduleDropDown/ScheduleDropDown';
import ClientCard from '../../components/ClientCard/ClientCard';
import PrivateContext from '../../contexts/PrivateContext';
import './scheduleroute.scss';

import GoogleMap from '../../components/GoogleMap/GoogleMap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default class ScheduleRoute extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      todayOfWeek: null,
      center: null,
    };
  }

  setCenter = (center) => {
    this.setState({
      center: center,
    });
  }

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
      (client) => client.day_of_week == this.state.todayOfWeek
    );

    if (this.context.scheduleFilter) {
      clientsFilter = this.context.clients.filter(
        (client) => client.day_of_week == this.context.scheduleFilter
      );
    }

    if (this.context.scheduleFilter == 7) {
      clientsFilter = this.context.clients;
    }

    if (this.context.scheduleSearch) {
      const searchTerm = this.context.scheduleSearch.toLowerCase();
      clientsFilter = clientsFilter.filter((client) =>
        client.name.toLowerCase().includes(searchTerm)
      );
    }

    return (
      <>
        <GoogleMap markers={clientsFilter} setCenter={this.setCenter}></GoogleMap>
        <div className='schedule-page'>
          {/* <GoogleMap markers={sampleClients} setCenter={this.setCenter}></GoogleMap> */}
          <ScheduleDropDown today={this.state.todayOfWeek} />
          <div className='client-cards'>
            {clientsFilter.map((store) => (
              <ClientCard data={store} key={store.id} />
            ))}
          </div>
        </div>
        <div className="list-map-buttons">
          <button className="btn">
            <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
            List view
          </button>
          <button className="btn">
            <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
            Map view
          </button>
        </div>
      </>
    );
  }
}
