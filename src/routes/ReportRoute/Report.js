import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import { prototype } from 'react-modal';

class Report extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      report: []
    }
  }



  render () {
    console.log('props', this.props)
    return (
      <section>
        hey guys
      </section>
    )
  }
}

export default Report;