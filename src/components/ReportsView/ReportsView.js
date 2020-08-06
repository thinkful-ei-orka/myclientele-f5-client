import React from 'react';
import PrivateContext from '../../contexts/PrivateContext'; //will need later?

class Reports extends React.Component {
  static contextType = PrivateContext; //is needed?
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {

    return (
      <section>

      </section>
    )
  }
}

export default Reports;