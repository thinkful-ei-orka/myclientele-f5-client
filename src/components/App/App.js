import React from 'react';
import { Switch } from 'react-router-dom';
import './App.scss';

import { UserProvider } from '../../contexts/UserContext'
import PrivateContext from '../../contexts/PrivateContext';
import ClientApiService from '../../services/client-api-service';
import ReportsApiService from '../../services/reports-api-service';
import CompaniesApiService from '../../services/companies-api-service';

import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import HomepageRoute from '../../routes/HomepageRoute/HomepageRoute';
import ClientsRoute from '../../routes/ClientsRoute/ClientsRoute';
import AddClientForm from '../AddClientForm/AddClientForm';

export default class App extends React.Component {
  // This state is set to the private context
  state = {
    clients: null,
    reports: null,
    company: null, // should this be here? this is the user's company
    // user: null, // should this be here? it would include things like name, username, company name, boss id, email
  }

  fetchContext = () => {
    this.fetchClients();
    this.fetchReports();
    // this.fetchCompanies();
    // what else?
  }

  fetchClients = () => {
    ClientApiService.getAllClients()
      .then(result => {
        this.setState({ clients: result });
      })
  }

  fetchReports = () => {

  }

  // what other fetches?

  updateContext = (contextUpdate) => {
    let newContext = {...this.state, ...contextUpdate};

    this.setState(newContext);
  }

  render() {
    let contextValue = this.state;
    contextValue.fetchContext = this.fetchContext;
    contextValue.fetchClients = this.fetchClients;
    contextValue.fetchReports = this.fetchReports;
    contextValue.updateContext = this.updateContext;

    return (
      <div className="App">
        <UserProvider>
          <Switch>
            <PublicRoute path="/" exact component={HomepageRoute} />
            <PublicRoute path="/login" exact component={HomepageRoute} />
            <PublicRoute path="/sign-up" exact component={HomepageRoute} />
            <PrivateContext.Provider value={contextValue}>
              <PrivateRoute path="/" exact component={ClientsRoute} />
            <PublicRoute exact path='/form' component={AddClientForm} />
              <PrivateRoute path="/schedule" component={ClientsRoute} />
            </PrivateContext.Provider>
          </Switch>
        </UserProvider>
      </div>
    );
  }
}
