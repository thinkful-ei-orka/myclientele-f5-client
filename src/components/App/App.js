import React from 'react';
import { Switch } from 'react-router-dom';
import './App.scss';

import UserContext from '../../contexts/UserContext'
import PrivateContext from '../../contexts/PrivateContext';
import ClientApiService from '../../services/client-api-service';
import ReportsApiService from '../../services/reports-api-service';
import CompaniesApiService from '../../services/companies-api-service';
// This is a placeholder
// import EventsApiService from '../../services/events-api-service';

import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import HomepageRoute from '../../routes/HomepageRoute/HomepageRoute';
import ClientsRoute from '../../routes/ClientsRoute/ClientsRoute';
import AddClientForm from '../AddClientForm/AddClientForm';
import ClientsMap from '../ClientsMap/ClientsMap';
import ClientsSearch from '../ClientsSearch/ClientsSearch';
import GoogleExperiment from '../GoogleExperiment/GoogleExperiment';
import AddClientRoute from '../../routes/AddClientRoute/AddClientRoute'
import AddClientMap from '../AddClient/AddClient';
import GoogleMapComponent from '../GoogleMap/GoogleMap';

export default class App extends React.Component {
  static contextType = UserContext;

  // This state is set to the private context
  state = {
    clients: null,
    reports: null,
    company: null,
    user: this.context.user,
    // this is pulling the user from the user context at the moment
    // this has user_id, company_id, name, and username
    // user potentially has more information like email, phone_number, and admin
  }

  fetchContext = () => {
    this.fetchClients();
    this.fetchReports();
    this.fetchCompany(this.context.user.company_id);
  }

  fetchClients = () => {
    ClientApiService.getAllClients()
      .then(result => {
        console.log('got clients', result);
        this.setState({ clients: result });
      })
  }

  fetchReports = () => {
    ReportsApiService.getAllReports()
      .then(result => {
        console.log('got reports', result);
        this.setState({ reports: result });
      })
  }

  fetchCompany = (company_id) => {
    CompaniesApiService.getCompany(company_id)
      .then(result => {
        console.log('got company', result);
        this.setState({ company: result });
      })
  }

  updateContext = (contextUpdate) => {
    let newContext = {...this.state, ...contextUpdate};

    this.setState(newContext);
  }

  render() {
    let contextValue = this.state;
    contextValue.fetchContext = this.fetchContext;
    contextValue.fetchClients = this.fetchClients;
    contextValue.fetchReports = this.fetchReports;
    contextValue.fetchCompany = this.fetchCompany;
    contextValue.updateContext = this.updateContext;

    return (
      <div className="App">
        <Switch>
          <PublicRoute path="/" exact component={HomepageRoute} />
          <PublicRoute path="/login" exact component={HomepageRoute} />
          <PublicRoute path="/sign-up" exact component={HomepageRoute} />
          <PrivateContext.Provider value={contextValue}>
            <PrivateRoute path="/" exact component={ClientsRoute} />
            <PublicRoute exact path='/form' component={AddClientForm} />
            <PrivateRoute path="/schedule" component={ClientsRoute} />
            <PublicRoute path="/add-client" component={AddClientRoute} />
            <PrivateRoute path="/clients-map" component={ClientsMap} />
            <PublicRoute path="/clients-search" component={ClientsSearch} />
            <PrivateRoute path="/google" component={GoogleExperiment} />
            <PublicRoute path="/add-client-map" component={AddClientMap} />
          </PrivateContext.Provider>
        </Switch>
      </div>
    );
  }
}
