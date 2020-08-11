import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import { UserProvider } from '../../contexts/UserContext';
import PrivateContext from '../../contexts/PrivateContext';
import UserContext from '../../contexts/UserContext';

import ClientApiService from '../../services/client-api-service';
import ReportsApiService from '../../services/reports-api-service';
import CompaniesApiService from '../../services/companies-api-service';
// This is a placeholder
// import EventsApiService from '../../services/events-api-service';
import ScheduleRoute from '../../routes/ScheduleRoute/ScheduleRoute';
import Header from '../Header/Header';

import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import HomepageRoute from '../../routes/HomepageRoute/HomepageRoute';
import ClientsRoute from '../../routes/ClientsRoute/ClientsRoute';
import AddClientForm from '../AddClientForm/AddClientForm';
import ReportsView from '../../components/ReportsView/ReportsView';
import Report from '../../routes/ReportRoute/Report';
import TakeReport from '../../components/TakeReport/TakeReport';

export default class App extends React.Component {
  static contextType = UserContext;

  // This state is set to the private context
  state = {
    clients: null,
    reports: null,
    company: null,
    user: this.context.user,
    scheduleFilter: null,
    // this is pulling the user from the user context at the moment
    // this has user_id, company_id, name, and username
    // user potentially has more information like email, phone_number, and admin
  };

  fetchContext = () => {
    this.fetchClients();
    this.fetchReports();
    this.fetchCompany(this.context.user.company_id);
  };

  fetchClients = () => {
    return ClientApiService.getAllClients().then((result) => {
      console.log('got clients', result);
      this.setState({ clients: result });
    });
  };

  fetchReports = () => {
    ReportsApiService.getAllReports().then((result) => {
      console.log('got reports', result);
      this.setState({ reports: result });
    });
  };

  fetchCompany = (company_id) => {
    CompaniesApiService.getCompany(company_id).then((result) => {
      console.log('got company', result);
      this.setState({ company: result });
    });
  };

  updateContext = (contextUpdate) => {
    let newContext = { ...this.state, ...contextUpdate };

    this.setState(newContext);
  };

  setScheduleFilter = (newFilter) => {
    this.setState({scheduleFilter: newFilter})
  }

  render() {
    let contextValue = this.state;
    contextValue.fetchContext = this.fetchContext;
    contextValue.fetchClients = this.fetchClients;
    contextValue.fetchReports = this.fetchReports;
    contextValue.fetchCompany = this.fetchCompany;
    contextValue.updateContext = this.updateContext;
    contextValue.setScheduleFilter = this.setScheduleFilter;

    return (
      <div className='App'>
        <Switch>
          <PublicRoute path='/' exact component={HomepageRoute} />
          <PublicRoute path='/login' exact component={HomepageRoute} />
          <PublicRoute path='/sign-up' exact component={HomepageRoute} />
          <PrivateContext.Provider value={contextValue}>
            <Header />
            <PrivateRoute path='/schedule' exact component={ScheduleRoute} />
            <PrivateRoute exact path='/form' component={AddClientForm} />
            <PrivateRoute exact path='/reports' component={ReportsView} />
            <PrivateRoute path='/reports/:report_id' component={Report} />
            <PrivateRoute path='/take-report' component={TakeReport} />
          </PrivateContext.Provider>
        </Switch>
      </div>
    );
  }
}
