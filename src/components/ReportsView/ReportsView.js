import React from 'react';
import PrivateContext from '../../contexts/PrivateContext'; //will need later?
import ReportsApiService from '../../services/reports-api-service';
import { Link } from 'react-router-dom';

class Reports extends React.Component {
  static contextType = PrivateContext; //is needed?
  constructor(props) {
    super(props);
    this.state = {
      reports: []
    }
  }

  componentDidMount() {
   if(this.state.reports.length === 0) {
     ReportsApiService.getAllReports()
      .then(res => 
        this.setState({ reports: res })  
      )
   } 
  }

  render () {
    console.log('context', this.context)
    console.log('props', this.props)
    console.log('ReaportsApiService', ReportsApiService)
    console.log('reports in state', this.state.reports)
    let reports = this.state.reports;
    let editedReports = []
    if(reports) {
      editedReports = reports.map(report => {
        if(report.photo_url === '') {
          report.photo_url = '&#8999;'
        }
      })
    }
    console.log('reports var', editedReports)
    if(this.state.reports.length === 0) {
      return (
        <section>
          Fetching Reports
        </section>
      )
    }
    return (
      <section aria-label='Your reports'>
        {/* <h1>Reports</h1>
        <ul>
          {editedReports.map(report => 
            <Link key={report.id} to={`/reports/${report.id}`} className='reportList-link'>
              <li className='report-li' id={report.id}>
                <img src={`${report.photo_url}`} alt='Client report photo'/>
                <p className='client-name'>{report.name}</p>
                <p className='client-address'>{report.location}</p>
              </li>
            </Link>
          )}
        </ul> */}
        hi mom
      </section>
    )
  }
}

export default Reports;