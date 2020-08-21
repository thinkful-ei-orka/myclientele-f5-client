<<<<<<< HEAD
import React from "react";
import ScheduleDropDown from "../../components/ScheduleView/ScheduleDropDown/ScheduleDropDown";
import ClientCard from "../../components/ClientCard/ClientCard";
import PrivateContext from "../../contexts/PrivateContext";
import "./scheduleroute.scss";
=======
import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleDropDown from '../../components/ScheduleView/ScheduleDropDown/ScheduleDropDown';
import ClientCard from '../../components/ClientCard/ClientCard';
import PrivateContext from '../../contexts/PrivateContext';
import './scheduleroute.scss';
>>>>>>> a875de5d4b680763148faf863a66206b05ca0ebe

import GoogleMap from "../../components/GoogleMap/GoogleMap";
import ListMapToggle from "../../components/ListMapToggle/ListMapToggle";
import UserApiService from "../../services/user-api-service";

export default class ScheduleRoute extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      todayOfWeek: null,
      center: null,
<<<<<<< HEAD
      listClass: "",
      mapClass: "mobile-hidden",
=======
      listClass: '',
      mapClass: 'mobile-hidden',
      // noClients: false,
>>>>>>> a875de5d4b680763148faf863a66206b05ca0ebe
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

<<<<<<< HEAD

=======
//   setNoClients = () => {
//     this.setState({
//       noClients: true
//     })
//  }
>>>>>>> a875de5d4b680763148faf863a66206b05ca0ebe

  componentDidMount() {
    UserApiService.getUserContactInfo().then((user) => {
      console.log(user);
      if (this.context.clients === null) {
        this.context
          .fetchClients()
          .then(this.context.fetchUserInfo())
          .then(() => this.setState({ isLoading: false }));
      }
    });

    let date = new Date();
    this.setState({ todayOfWeek: date.getDay() });

    // if (this.context.scheduleFilter == null) {
    //   this.context.setScheduleFilter(this.state.todayOfWeek)
    //   console.log(this.context.scheduleFilter)
    //}
  }

  render() {
    let noClients = false;
    if (this.context.clients === null) {
      return <div>Loading...</div>;
    }
    let clientsFilter = this.context.clients.filter((client) => {
      return client.day_of_week === Number(this.state.todayOfWeek);
    });

    if (this.context.scheduleFilter) {
      clientsFilter = this.context.clients.filter((client) => {
        return client.day_of_week === Number(this.context.scheduleFilter);
      });
    }

    if (Number(this.context.scheduleFilter) === 7) {
      clientsFilter = this.context.clients;
    }

    if (this.context.scheduleSearch) {
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
