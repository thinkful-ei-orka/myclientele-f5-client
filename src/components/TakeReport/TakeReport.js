import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import { withRouter, Link } from 'react-router-dom';
import './takereport.scss';
import S3ApiService from '../../services/s3-api-service';


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

  onFormSubmit = async e => {
    e.preventDefault();
<<<<<<< HEAD
    const notes = e.target["report-text-input"].value;
    const photoInput = e.target["report-photo-input"];
    const file = photoInput.files;
    const photos = await this.getPhotoUrlList(file);
    console.log(photos)
    ReportsApiService.addReport(
      this.client_id,
      notes,
      photos
    ).then(() => this.props.history.push("/schedule")).catch((error) => console.log(error));
  };

  getPhotoUrlList = async file => {
    let photos = [];
    
    for (let key in file) {
      if (!isNaN(Number(key))) {
        console.log("name ", file[key].name, "... type ", file[key].type);
        let res = await S3ApiService.getUploadUrl(file[key].name, file[key].type)
            console.log("response url", res)
        let data = await fetch(res.url, {
              method: "PUT",
              body: file[key],
            })
        photos.push(data.url.split("?")[0])     
      }
    }
    return photos;
  }
  componentDidMount() {
    if (this.state.reports.length === 0) {
      ReportsApiService.getReportsByClientId(this.client_id).then((res) => {
        console.log(res);
        this.setState({ reports: res, isLoading: false });
      });
    }
  }

  render() {
    console.log(this.state.img_src);
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
<<<<<<< HEAD
              type="file"
              multiple="multiple"
              accept="image/*"
              name="report-photo-input"
              id="report-photo-input"
              alt="alt_text"
              required
            ></input>
            <button className="btn">Submit</button>
=======
              type='file'
              accept='image/*'
              name='report-photo-input'
              id='report-photo-input'
              alt='alt_text'
              required></input>
            <button className='btn'>Submit</button>
>>>>>>> 0556236ea5075cae81ad0fa3294513ee9bd4ce4e
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
<<<<<<< HEAD
                    className="company-logo"
                    src={report.photos[0]}
=======
                    className='company-logo'
                    src={report.photo_url}
>>>>>>> 0556236ea5075cae81ad0fa3294513ee9bd4ce4e
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
