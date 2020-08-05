import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PrivateContext from '../../contexts/PrivateContext';

export default class TestRoute extends React.Component {
  // This state is set to the private context
  state = {
    clients: null,
    reports: null,
    company: null, // should this be here? this is the user's company
    // user: null, // should this be here? it would include things like name, username, company name, boss id, email
  }



  updateContext = (contextUpdate) => {
    let newContext = {...this.state, ...contextUpdate};

    this.setState(newContext);
  }

  render() {
    let contextValue = this.state;
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
