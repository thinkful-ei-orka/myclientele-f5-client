import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import { prototype } from 'react-modal';

class ReportRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      report: []
    }
  }

  componentDidMount() {
    console.log('compDidMount')
    console.log('id', this.props.match.params.report_id)
    ReportsApiService.getReport(this.props.match.params.report_id)
      .then(res => this.setState({ report: res }))
  }

  render () {
    console.log('props', this.props)
    console.log('report', this.state.report)
    let photo_url = '';
    if (this.state.report) {
      if (this.state.report.photo_url === '') {
        photo_url = 'https://via.placeholder.com/150'
      } else {
        photo_url = this.state.report.photo_url
      }
    }
    console.log(photo_url)
    return (
      <section>
        <p>Client Name: {this.state.report.name}</p>
        <p>Notes: {this.state.report.notes}</p>
        <p><img src={photo_url} alt={this.state.report.name}></img></p>
        <p>Report Date: {this.state.report.date}</p>
        {/* <p>Sales Rep Name: {this.state.report.name}</p> */}
      </section>
    )
  }
}

export default ReportRoute;
