import React from 'react';
import PrivateContext from '../../contexts/PrivateContext'; //will need later?
import ReportsApiService from '../../services/reports-api-service';
import { Link } from 'react-router-dom';
import './ReportsView.scss';
import ClientApiService from '../../services/client-api-service';

class Reports extends React.Component {
  static contextType = PrivateContext; //is needed?
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      clients: [],
    };
  }

  componentDidMount() {
    if (this.context.reports === null || this.state.reports.length === 0) {
      ReportsApiService.getAllReports().then((res) =>
        this.setState({ reports: res })
      );
    }
    if (this.context.clients === null || this.state.clients.length === 0) {
      ClientApiService.getAllClients().then((res) => {
        this.context.updateContext({ clients: res })
        this.setState({
          clients: res
        })
      } 
      );
    }
  };
  
  matchReportToClient = (reportId) => {
    const clientData = this.state.clients.find(
      (client) => client.id === reportId
    );
    if (!clientData) {
      return `No matched client`;
    }
    return clientData;
  };

  render() {
    let reports = this.state.reports;
    if (reports) {
      reports.map((report) => {
        if (report.photos === '') {
          return (report.photos = ['https://via.placeholder.com/150']);
        } else {
          return '';
        }
      });
    }
    if (this.state.reports.length === 0) {
      return <section>Fetching Reports</section>;
    }
    
    return (
      <section aria-label='Your reports' className='report-list'>
        <h1>Reports</h1>
        <ul className='report-list-ul'>
          {reports.map((report) => {
            const newDate = new Date(report.date);
            const clientData = this.matchReportToClient(report.client_id);
            let imgsrc = 'https://via.placeholder.com/150';
            if(report.photos !== []) {
              imgsrc = report.photos[0];
            }
            return (
              <Link
                key={report.id}
                to={`/reports/${report.id}`}
                className='reportList-link'>
                <li className='report-li' id={report.id}>
                  <div className='main-info-area'>
                    <div className='company-logo'>
                      <img
                        className='reports-img'
                        src={imgsrc}
                        alt={report.name}
                      />
                    </div>

                    <div className='information-area'>
                      <h2>{clientData.name || `Not assigned`}</h2>
                      <p>{clientData.location}</p>
                      <p>{report.name}</p>
                    </div>
                  </div>
                  <div className='submitted-area'>
                    <p>Submitted: {newDate.toLocaleDateString()}</p>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Reports;
