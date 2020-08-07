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

  componentDidMount() {
    console.log('compDidMount')
    ReportsApiService.getReport(this.props.match.params.report_id)
      .then(res => this.setState({ report: res }))
  }

  render () {
    console.log('props', this.props)
    console.log('report', this.state.report)
    return (
      <section>
        hey guys
      </section>
    )
  }
}

export default Report;