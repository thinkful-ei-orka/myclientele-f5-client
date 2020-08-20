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
import UserApiService from '../../services/user-api-service'
// This is a placeholder
// import EventsApiService from '../../services/events-api-service';

// Public and Private Routes
import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

// Routes
import HomepageRoute from '../../routes/HomepageRoute/HomepageRoute';
import ClientRoute from '../../routes/ClientRoute/ClientRoute';
import ClientReportsRoute from '../../routes/ClientReportsRoute/ClientReportsRoute.js';
import AddClientRoute from '../../routes/AddClientRoute/AddClientRoute';
import ReportRoute from '../../routes/ReportRoute/ReportRoute';
import ScheduleRoute from '../../routes/ScheduleRoute/ScheduleRoute';
import MyAccountRoute from '../../routes/MyAccountRoute/MyAccountRoute';

// Components
import Header from '../Header/Header';
import AddClientForm from '../AddClientForm/AddClientForm';
import ReportsView from '../../components/ReportsView/ReportsView';
import TakeReport from '../../components/TakeReport/TakeReport';
// import ClientsSearch from '../ClientsSearch/ClientsSearch';
// import AddClientMap from '../AddClient/AddClient';
import MobileNav from '../MobileNav/MobileNav';
import Swiper from "../Swiper/Swiper";

export default class App extends React.Component {
  static contextType = UserContext;

  // This state is set to the private context
  state = {
    clients: null,
    reports: null,
    company: null,
    user: this.context.user,
    userContact: {},
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
    this.fetchUserInfo();
  };

  fetchClients = () => {
    return ClientApiService.getAllClients().then((result) => {
      this.setState({ clients: result });
    });
  };

  fetchReports = () => {
    ReportsApiService.getAllReports().then((result) => {
      this.setState({ reports: result });
    });
  };

  fetchCompany = (company_id) => {
    CompaniesApiService.getCompany(company_id).then((result) => {
      this.setState({ company: result });
    });
  };

  fetchUserInfo = () => {
    UserApiService.getUserContactInfo().then((result) => {
    console.log('got user contact', result)
    this.setState({ userContact: result})
  });
  }

  updateContext = (contextUpdate) => {
    let newContext = { ...this.state, ...contextUpdate };

    this.setState(newContext);
  };

  setScheduleFilter = (newFilter) => {
    this.setState({ scheduleFilter: newFilter });
  };

  setScheduleSearch = (searchTerm) => {
    this.setState({ scheduleSearch: searchTerm });
  };

  render() {
    let contextValue = this.state;
    contextValue.fetchContext = this.fetchContext;
    contextValue.fetchClients = this.fetchClients;
    contextValue.fetchReports = this.fetchReports;
    contextValue.fetchCompany = this.fetchCompany;
    contextValue.fetchUserInfo = this.fetchUserInfo;
    contextValue.updateContext = this.updateContext;
    contextValue.setScheduleFilter = this.setScheduleFilter;
    contextValue.setScheduleSearch = this.setScheduleSearch;
    // console.log('context value', contextValue);
    return (
      <div className='App'>
        <Switch>
          <PublicRoute path='/' exact component={HomepageRoute} />
          <PublicRoute path='/login' exact component={HomepageRoute} />
          <PublicRoute path='/sign-up' exact component={HomepageRoute} />
          <PublicRoute path='/swiper' exact component={Swiper} />
          <PrivateContext.Provider value={contextValue}>
            <Header />
            <PrivateRoute path='/schedule' exact component={ScheduleRoute} />
            <PrivateRoute path='/form' exact component={AddClientForm} />
            <PrivateRoute path='/reports' exact component={ReportsView} />
            <PrivateRoute path='/take-report' component={TakeReport} />
            <PrivateRoute path='/clients/:id' exact component={ClientRoute} />
            <PrivateRoute
              path='/clients/:id/reports'
              exact
              component={ClientReportsRoute}
            />
            <PrivateRoute
              path='/clients/:id/add'
              exact
              component={TakeReport}
            />
            <PrivateRoute
              path='/clients/:id/edit'
              exact
              component={AddClientForm}
            />

            <PrivateRoute path='/add-client' component={AddClientRoute} />
            <PrivateRoute
              exact
              path='/add-client-form'
              component={AddClientForm}
            />
            <PrivateRoute exact path='/reports' component={ReportsView} />
            <PrivateRoute path='/reports/:report_id' component={ReportRoute} />

            <PrivateRoute path='/my-account' component={MyAccountRoute} />

            {/* <PrivateRoute path='/add-client-map' component={AddClientMap} /> */}

             <PrivateRoute path='/take-report' component={TakeReport} />


            <MobileNav />
          </PrivateContext.Provider>
        </Switch>
      </div>
    );
  }
}
