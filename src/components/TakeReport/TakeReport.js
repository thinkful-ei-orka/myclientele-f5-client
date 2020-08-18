import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import { withRouter, Link } from 'react-router-dom';
import './takereport.scss';
import S3ApiService from '../../services/s3-api-service';
import ReportsView from '../../components/ReportsView/ReportsView';

//What all operations do we want to give the user in terms of interacting with photos. After they do the initial upload, what all do we want to allow the user to do with photos.

//How do we want to handle gathering photos? Do we want to have a specific photo route that we make API calls to or do we just want to have all the requests to get photos be handled by the Reports router? If we do the latter then we will only have to make one request instead of two (one for reports and one for photos).

//How do we want to display multiple images?  Do we want to add that feature to the client card?

class TakeReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      signedUrl: '',
      file_name: '',
      img_src: null,
      isLoading: true,
    };
  }
  data = this.props.location.state.data;
  // const { data } = this.props.location.state;
  client_id = this.data.id;

  onFormSubmit = async (e) => {
    e.preventDefault();

    const notes = e.target['report-text-input'].value;
    const photoInput = e.target['report-photo-input'];
    const file = photoInput.files;
    const photos = await this.getPhotoUrlList(file);
    ReportsApiService.addReport(this.client_id, notes, photos)
      .then(() => this.props.history.push('/schedule'))
      .catch((error) => console.log(error));
  };

  getPhotoUrlList = async (file) => {
    let photos = [];

    for (let key in file) {
      if (!isNaN(Number(key))) {
        let res = await S3ApiService.getUploadUrl(
          file[key].name,
          file[key].type
        );
        let data = await fetch(res.url, {
          method: 'PUT',
          body: file[key],
        });
        photos.push(data.url.split('?')[0]);
      }
    }
    return photos;
  };
  componentDidMount() {
    if (this.state.reports.length === 0) {
      ReportsApiService.getReportsByClientId(this.client_id).then((res) => {
        this.setState({ reports: res, isLoading: false });
      });
    }
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
            <h2 id='store-name'>{this.data.name} </h2>
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
              type='file'
              multiple='multiple'
              accept='image/*'
              name='report-photo-input'
              id='report-photo-input'
              alt='alt_text'
              required></input>
            <button className='btn' id='take-a-report-btn'>
              Submit
            </button>
          </form>
        </div>
        <section aria-label='Your reports' className='report-list'>
          <h1 id='previous-report-title'>Previous Reports</h1>
          <ul className='report-list-ul'>
            {this.state.reports.map((report) => (
              <Link
                key={report.id}
                to={`/reports/${report.id}`}
                className='reportList-link'>
                <li className='report-li' id={report.id}>
                  <div className='main-info-area'>
                    <div className='company-logo'>
                      <img
                        id='reports-img'
                        src='https://via.placeholder.com/150'
                        alt={report.name}
                      />
                    </div>

                    <div className='information-area'>
                      <h2>{this.data.name || `Not assigned`}</h2>
                      <p>{this.data.location}</p>
                      <p>{report.name}</p>

                      {console.log(this.data)}
                    </div>
                  </div>
                  <div className='submitted-area'>
                    <p>
                      Submitted: {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
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
