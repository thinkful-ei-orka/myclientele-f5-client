import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import ReportsApiService from '../../services/reports-api-service';
import { Link } from 'react-router-dom';
import '../ReportsView/ReportsView.scss';

class Reports extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
    };
  }

  componentDidMount() {
    // get reports if there are none
    if (this.state.reports.length === 0) {
      ReportsApiService.getAllReports().then((res) =>
        this.setState({ reports: res })
      );
    }
  };

  render() {
    let reports = this.state.reports;
    if (reports) {
      reports.map((report) => {
        if (report.photo_url === '') {
          return (report.photo_url = 'https://via.placeholder.com/150');
        }
      });
    }
    if (this.state.reports.length === 0) {
      return <section>Fetching Reports</section>;
    }
    return (
      <section aria-label='Your reports' className='report-list'>
        <h1>Reports</h1>
        <p>{reports[0].name}</p>
        <p>{reports[0].location}</p>
        <ul className='report-list-ul'>
          {reports.map((report) => (
            <Link
              key={report.id}
              to={`/reports/${report.id}`}
              className='reportList-link'>
              <li className='report-li' id={report.id}>
                <img
                  className='company-logo'
                  src={report.photo_url}
                  alt={report.name}
                />
                <p className='information-area'>{report.notes}</p>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    );
  }
}

export default Reports;
