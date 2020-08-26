import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import { withRouter, Link } from 'react-router-dom';
import './takereport.scss';
import S3ApiService from '../../services/s3-api-service';
import ClientApiService from '../../services/client-api-service';

class TakeReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      signedUrl: '',
      file_name: '',
      img_src: null,
      isLoading: true,
      submitting: false,
      mobile: false
    };
  }
  data = this.props.location.state.data;
  client_id = this.data.id;

  // add a report
  onFormSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      submitting: true
    })
    const notes = e.target["report-text-input"].value;
    const photoInput = e.target["report-photo-input"];
    const file = photoInput.files;
    const photos = await this.getPhotoUrlList(file);
    ReportsApiService.addReport(
      this.client_id,
      notes,
      photos
    ).then(() => {
      this.setState({
        submitting: false
      })
      this.props.history.push("/schedule")
    }).catch((error) => console.log(error));
  };

  // upload image files to S3, and get URLs
  getPhotoUrlList = async (file) => {
    let photos = [];
    for (let key in file) {
      if (!isNaN(Number(key))) {
        let res = await S3ApiService.getUploadUrl(file[key].name, file[key].type)
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
    if(window.location.pathname.includes('/clients')) {
      this.setState({
        mobile: true
      })
    }
    if (this.state.reports.length === 0) {
      ReportsApiService.getReportsByClientId(this.client_id).then((res) => {
        this.setState({ reports: res })
      }).then(() => ClientApiService.getClient(this.client_id)).then(res => {
        this.setState({client: res, isLoading: false})
      })
    }
  };

  renderPreviousReports = () => {
    return (
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
                    className="company-logo"
                    src={report.photos[0]}
                    alt={report.name}
                  />
                  <p className='information-area'>{report.notes}</p>
                </li>
              </Link>
            ))}
          </ul>
        </section>
    )
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    let imgsrc = 'https://via.placeholder.com/150';
    if(this.state.client.photo) {
      imgsrc = this.state.client.photo;
    }
    return (
      <div className='take-a-report'>
        <h1>Take a Report</h1>
        <div className='basic-client-card'>
          <div className='company-logo'>
            <img src={imgsrc} alt={this.data.name} />
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
              type="file"
              multiple="multiple"
              accept="image/*"
              name="report-photo-input"
              id="report-photo-input"
              alt="alt_text"
            ></input>
            <button className="btn" disabled={this.state.submitting}>Submit</button>
          </form>
          {this.state.submitting
          ? <p>submitting report...</p>
          : ""
           }
        </div>

        {!this.state.mobile
        ? this.renderPreviousReports()
        : ""
        }
      </div>
    );
  }
}

export default withRouter(TakeReport);
