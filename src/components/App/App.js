import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import './App.scss';

// import { UserProvider } from '../../contexts/UserContext';
import PrivateContext from '../../contexts/PrivateContext';
import UserContext from '../../contexts/UserContext';

// API Services
import ClientApiService from '../../services/client-api-service';
import ReportsApiService from '../../services/reports-api-service';
import CompaniesApiService from '../../services/companies-api-service';
// This is a placeholder
// import EventsApiService from '../../services/events-api-service';


// Public and Private Routes
import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

// Routes
import HomepageRoute from '../../routes/HomepageRoute/HomepageRoute';
import ClientsRoute from '../../routes/ClientsRoute/ClientsRoute';
import AddClientRoute from '../../routes/AddClientRoute/AddClientRoute'
import ReportRoute from '../../routes/ReportRoute/ReportRoute';
import ScheduleRoute from '../../routes/ScheduleRoute/ScheduleRoute';

// Componentes
import Header from '../Header/Header';
import AddClientForm from '../AddClientForm/AddClientForm';
import ReportsView from '../../components/ReportsView/ReportsView';
import TakeReport from '../../components/TakeReport/TakeReport';
import ClientsMap from '../ClientsMap/ClientsMap';
import ClientsSearch from '../ClientsSearch/ClientsSearch';
import GoogleExperiment from '../GoogleExperiment/GoogleExperiment';
import AddClientMap from '../AddClient/AddClient';


export default class App extends React.Component {
  static contextType = UserContext;

  // This state is set to the private context
  state = {
    clients: null,
    reports: null,
    company: null,
    user: this.context.user,
    scheduleFilter: null,
    scheduleSearch: null,
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

  setScheduleSearch = (searchTerm) => {
    this.setState({scheduleSearch: searchTerm})
  }

  render() {
    let contextValue = this.state;
    contextValue.fetchContext = this.fetchContext;
    contextValue.fetchClients = this.fetchClients;
    contextValue.fetchReports = this.fetchReports;
    contextValue.fetchCompany = this.fetchCompany;
    contextValue.updateContext = this.updateContext;
    contextValue.setScheduleFilter = this.setScheduleFilter;
    contextValue.setScheduleSearch = this.setScheduleSearch;

    return (
      <div className='App'>
        <Switch>
          <PublicRoute path='/' exact component={HomepageRoute} />
          <PublicRoute path='/login' exact component={HomepageRoute} />
          <PublicRoute path='/sign-up' exact component={HomepageRoute} />
          <PrivateContext.Provider value={contextValue}>
            <Header />
            {/* We need to clean these up sometime. */}
            <PrivateRoute path="/" exact component={ClientsRoute} />
            <PrivateRoute path='/schedule' exact component={ScheduleRoute} />
            <PrivateRoute exact path='/form' component={AddClientForm} />
            <PrivateRoute exact path='/reports' component={ReportsView} />
            <PrivateRoute path='/reports/:report_id' component={ReportRoute} />
            <PrivateRoute path='/take-report' component={TakeReport} />
            {/* These were on another branch. */}
            <PublicRoute exact path='/form' component={AddClientForm} />
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
