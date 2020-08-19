import React from 'react';
import { Rectangle } from '@react-google-maps/api';
import PrivateContext from '../../contexts/PrivateContext';
import ClientApiService from '../../services/client-api-service';
import ReportsApiService from '../../services/reports-api-service';
import "./ClientReportsRoute.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export default class ClientReportsRoute extends React.Component {
  static contextType = PrivateContext;
  state = {
    client: {},
    reports: []
  }

  componentDidMount () {
       let clientId = window.location.pathname.split('/')[2];
       ClientApiService.getClient(clientId).then(res => this.setState({
         client: res
       })).then(() => ReportsApiService.getReportsByClientId(clientId)).then(reports => {
         this.setState({
           reports: reports
         })
       })
  }
  render() {
    console.log(this.state.client, this.state.reports)

    if(this.state.client === []) {
      return <h1>loading...</h1>;
    } else {
      return (
        <div className='client_reports'>
          <h1 id="client_reports_header">Reports</h1>
          <div className='client_header'>
            <h3>{this.state.client.name}</h3>
            <p>{this.state.client.location}</p>
          </div>
          <ul className='reports_box'>
            {this.state.reports.map(report => {
              let date = new Date(report.date);
              let report_photo;
              if (report.photos.length) {
                report_photo = <img src={report.photos[0]} alt={report.name} />
              } else {
                report_photo = <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
              }

              return <li className="client_report_li" key={report.id}>
                <div className="client_report_photo">{report_photo}</div>
                <div className="report_info">
                  <p className="report_notes">{report.notes}</p>
                  <p className="report_date">{date.toLocaleString()}</p>
                </div>
              </li>
            })}
          </ul>
        </div>
      )
    }
  }

}
