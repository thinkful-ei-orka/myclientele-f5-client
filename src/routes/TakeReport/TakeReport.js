import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import { withRouter } from 'react-router-dom';
import './takereport.scss';

class TakeReport extends React.Component {
  data = this.props.location.state.data;
  // const { data } = this.props.location.state;

  onFormSubmit = (e) => {
    e.preventDefault();
    const notes = e.target['report-text-input'].value;
    const photo_url = e.target['report-photo-input'].value;
    const client_id = this.data.id;

    ReportsApiService.addReport(client_id, notes, photo_url).then(() => {
      this.props.history.push('/schedule');
    });
  };

  render() {
    return (
      <div className='take-a-report'>
        <h1>Take a Report</h1>
        <div className='schedule-card'>
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
      </div>
    );
  }
}

export default withRouter(TakeReport);
