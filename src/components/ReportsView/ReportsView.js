import React from 'react';
import PrivateContext from '../../contexts/PrivateContext'; //will need later?
import ReportsApiService from '../../services/reports-api-service';
import { Link } from 'react-router-dom';
import './ReportsView.css'

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
    if(reports) {
      reports.map(report => {
        if(report.photo_url === '') {
          return report.photo_url = 'https://via.placeholder.com/150'
        }
      })
    }
    console.log('reports var', reports)
    if(this.state.reports.length === 0) {
      return (
        <section>
          Fetching Reports
        </section>
      )
    }
    return (
      <section aria-label='Your reports'>
        <h1>Reports</h1>
        <ul>
          {reports.map(report => 
            <Link key={report.id} to={`/reports/${report.id}`} className='reportList-link'>
              <li className='report-li' id={report.id}>
                <img src={report.photo_url} alt={report.name}/>
                <p className='client-name'>{report.name}</p>
                <p className='client-address'>{report.location}</p>
              </li>
            </Link>
          )}
        </ul>
      </section>
    )
  }
}

export default Reports;