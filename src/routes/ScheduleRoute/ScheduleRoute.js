import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleDropDown from '../../components/ScheduleView/ScheduleDropDown/ScheduleDropDown';
import ClientCard from '../../components/ClientCard/ClientCard';
import PrivateContext from '../../contexts/PrivateContext';
import './scheduleroute.scss';

import GoogleMap from "../../components/GoogleMap/GoogleMap";
import ListMapToggle from "../../components/ListMapToggle/ListMapToggle";
import UserApiService from "../../services/user-api-service";

export default class ScheduleRoute extends React.Component {
  //Main route when the user initially logs into the app, and contains their daily schedule
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

  syncCenter = (center) => {
    this.setState({
      center: center,
    });
  };

  listClick = () => {
    this.setState({
      listClass: "",
      mapClass: "mobile-hidden",
    });
  };

  mapClick = () => {
    this.setState({
      listClass: "mobile-hidden",
      mapClass: "",
    });
  };

  async componentDidMount () {
    let user = await UserApiService.getUserContactInfo();
    if(user.admin) {
      const { history } = this.props;
      history.push("/dashboard");
      window.location.reload();
    }
      if (this.context.clients === null) {
        this.context
          .fetchClients()
          .then(this.context.fetchUserInfo())
          .then(() => this.setState({ isLoading: false }));
      }
    let date = new Date();
    this.setState({ todayOfWeek: date.getDay() });
  };

  render() {
    let noClients = false;
    if (this.context.clients === null) {
      return <div>Loading...</div>;
    }
    let clientsFilter = this.context.clients.filter((client) => {
      //Filter list of clients by day of week by default
      return client.day_of_week === Number(this.state.todayOfWeek);
    });

    if (this.context.scheduleFilter) {
      //filter list of clients by schedule filter, if user changes the schedule filter
      clientsFilter = this.context.clients.filter((client) => {
        return client.day_of_week === Number(this.context.scheduleFilter);
      });
    }

    if (Number(this.context.scheduleFilter) === 7) {
      //Show all clients
      clientsFilter = this.context.clients;
    }

    if (this.context.scheduleSearch) {
      //If search term, then also filter clients by search term
      const searchTerm = this.context.scheduleSearch.toLowerCase();
      clientsFilter = clientsFilter.filter((client) =>
        client.name.toLowerCase().includes(searchTerm)
      );
    }

    if (clientsFilter.length < 1) {
      noClients = true
    }

    return (
      <>
        {noClients && <p className='no-client-message'>You have no clients today. <Link to='add-client' className='link'>Would you like to add one?</Link></p>}
        <div className={`map-container ${this.state.mapClass}`}>
          <ScheduleDropDown today={this.state.todayOfWeek} />
          <GoogleMap
            markers={clientsFilter}
            syncCenter={this.syncCenter}
            centerOnCurrentLocation={false}
          ></GoogleMap>
        </div>
        <div className={`schedule-page ${this.state.listClass}`}>
          <ScheduleDropDown today={this.state.todayOfWeek} />
          <div className="client-cards">
            {clientsFilter.map((store) => (
              <ClientCard data={store} key={store.id} />
            ))}
          </div>
        </div>
        <ListMapToggle
          listClick={this.listClick}
          mapClick={this.mapClick}
        ></ListMapToggle>
      </>
    );
  }
}
