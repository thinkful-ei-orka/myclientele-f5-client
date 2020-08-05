import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PrivateContext from '../../contexts/PrivateContext';
import ClientApiService from '../../services/client-api-service';
import ReportsApiService from '../../services/reports-api-service';
import CompaniesApiService from '../../services/companies-api-service';

export default class TestRoute extends React.Component {
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

  // do we want this here?
  // if this is here, the app will fetch data on every private route reload
  // otherwise, we can implement it on the individual routes
  onComponentMount() {
    // this.fetchContext();
  }

  render() {
    let contextValue = this.state;
    contextValue.fetchContext = this.fetchContext;
    contextValue.fetchClients = this.fetchClients;
    contextValue.fetchReports = this.fetchReports;
    contextValue.updateContext = this.updateContext;

    const Component = this.props.component;

    return (
      <PrivateContext.Provider value={contextValue}>
        <Route
          {...this.props}
          render={componentProps => (
            <Component {...componentProps} />
          )}
        />
      </PrivateContext.Provider>
    )
  }
}

// export default function TestRoute({ component, ...props }) {
//   const Component = component
//   return (
//     <Route
//       {...props}
//       render={componentProps => (
//         <Component {...componentProps} />
//       )}
//     />
//   )
// }
