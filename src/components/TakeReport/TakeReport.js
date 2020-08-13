import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import { withRouter, Link } from 'react-router-dom';
import './takereport.scss';
import S3ApiService from '../../services/s3-api-service';

class TakeReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      isLoading: true,
    };
  }
  data = this.props.location.state.data;
  // const { data } = this.props.location.state;
  client_id = this.data.id;

  onFormSubmit = (e) => {
    e.preventDefault();
    const notes = e.target['report-text-input'].value;
    const photo_url = e.target['report-photo-input'].value;

    ReportsApiService.addReport(this.client_id, notes, photo_url).then(() => {
      this.props.history.push('/schedule');
    });
  };
  componentDidMount() {
    if (this.state.reports.length === 0) {
      ReportsApiService.getReportsByClientId(this.client_id).then((res) => {
        console.log(res);
        this.setState({ reports: res, isLoading: false });
      });
    }
    S3ApiService.getUploadUrl().then((res) => console.log(res));
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className='take-a-report'>
        <h1>Take a Report</h1>
        <div className='basic-client-card'>
          <div className='company-logo'>
            <img src='https://via.placeholder.com/150' alt={this.data.name} />
          </div>
          <div className='information-area'>
            <h2>{this.data.name} </h2>
            <div className='location'>{this.data.location}</div>
          </div>
        </div>
        <div className='report-input'>
          <form
            className='take-a-report-form'
            onSubmit={(e) => this.onFormSubmit(e)}>
            <label htmlFor='report-text-input'>Write your report:</label>
            <textarea
              type='text'
              id='report-text-input'
              name='report-text-input'></textarea>
            <label htmlFor='report-photo-input'>Add a photo:</label>
            <input
              type='url'
              name='report-photo-input'
              id='report-photo-input'
              placeholder='https://example.com'
              pattern='https://.*'
              size='30'
              required></input>
            <button className='btn'>Submit</button>
          </form>
        </div>
        <section aria-label='Your reports' className='report-list'>
          <h1>Previous Reports</h1>

          <ul className='report-list-ul'>
            {this.state.reports.map((report) => (
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
      </div>
    );
  }
}

export default withRouter(TakeReport);
