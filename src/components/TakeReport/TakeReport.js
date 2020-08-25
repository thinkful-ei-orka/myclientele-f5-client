import React from "react";
import ReportsApiService from "../../services/reports-api-service";
import { withRouter, Link } from "react-router-dom";
import "./takereport.scss";
import S3ApiService from "../../services/s3-api-service";
import ClientApiService from "../../services/client-api-service";
import PhotoApiService from "../../services/photo-api-service";
class TakeReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header_text: "Take a Report",
      reports: [],
      signedUrl: "",
      file_name: "",
      img_src: null,
      isLoading: true,
      photoToDelete: null,
      confirmingDeletePhoto: false,
      submitting: false,
      client: null,
      report_id: null,
      notes: "",
      currentPhotos: null,
      mobile: false,
      data: null,
      client_id: null,
    };
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      submitting: true,
    });
    const notes = this.state.notes;
    const photoInput = e.target["report-photo-input"];
    const file = photoInput.files;
    const photos = await this.getPhotoUrlList(file);
    if (this.props.data) {
      ReportsApiService.updateReport(this.state.report_id, notes, photos)
      .then(() => {
        this.props.history.push('/reports')
        window.location.reload()
      })
      .catch(res => this.setState({error: res.error}))
    } else {
      ReportsApiService.addReport(this.state.client_id, notes, photos)
      .then(() => {
        this.setState({
          submitting: false,
        });
        this.props.history.push("/schedule");
      })
      .catch((error) => this.setState({error: error.error}));
    }
  };

  // upload image files to S3, and get URLs
  getPhotoUrlList = async (file) => {
    let photos = [];
    for (let key in file) {
      if (!isNaN(Number(key))) {
        let res = await S3ApiService.getUploadUrl(
          file[key].name,
          file[key].type
        );
        let data = await fetch(res.url, {
          method: "PUT",
          body: file[key],
        });
        photos.push(data.url.split("?")[0]);
      }
    }
    return photos;
  };

  setNotes = (e) => {
    this.setState({
      notes: e.target.value,
    });
  };

  async componentDidMount() {
    if (
      window.location.pathname.includes("/clients") ||
      window.location.pathname.includes("/reports")
    ) {
      this.setState({
        mobile: true,
      });
    }
    let data = "";
    if (this.props.data) {
      //hits this block if you are editing a report
      this.setState({
        header_text: "Edit Report",
      });
      let report_id = this.props.match.params.report_id;
      let currentReportEditing = await ReportsApiService.getReport(report_id)
      currentReportEditing = currentReportEditing[0];
      let { client_id, notes, photos } = currentReportEditing;
      let client = await ClientApiService.getClient(client_id)
      this.setState({
        report_id: currentReportEditing.id,
        data: client,
        client,
        client_id,
        notes,
        currentPhotos: photos,
        isLoading: false
      })
    }
    else if(this.props.location.state.data) {
      let client_id = this.props.location.state.data.id;
        ReportsApiService.getReportsByClientId(client_id)
          .then((res) => {
            this.setState({ reports: res, data: this.props.location.state.data });
          })
          .then(() => ClientApiService.getClient(client_id))
          .then((res) => {
            this.setState({ client: res, isLoading: false });
          });
      }
  }

  setConfirmDeletePhoto = (photo) => {
    if (this.state.confirmingDeletePhoto) {
      this.setState({
        photoToDelete: null,
        confirmingDeletePhoto: false,
      });
    } else {
      this.setState({
        confirmingDeletePhoto: true,
        photoToDelete: photo,
      });
    }
  };

  renderConfirmDeletePhoto = () => {
    return (
      <div id="confirm_delete_photo_box">
        <h3>
          Are you sure you would like to delete this photo? This cannot be
          undone.
        </h3>
        <img
          src={this.state.photoToDelete}
          alt="report_image"
          className="photo_to_delete"
        />
        <section className="delete_photo_buttons">
          <button type="button" onClick={this.deletePhoto}>
            Confirm
          </button>
          <button type="button" onClick={this.setConfirmDeletePhoto}>
            Cancel
          </button>
        </section>
      </div>
    );
  };

  deletePhoto = () => {
    let photo_url = this.state.photoToDelete;
    PhotoApiService.deletePhotoByUrl(photo_url)
      .then(() => {
        return ReportsApiService.getReport(this.state.report_id);
      })
      .then((report) => {
        this.setState({
          notes: report[0].notes,
          currentPhotos: report[0].photos,
          photoToDelete: null,
          confirmingDeletePhoto: false,
        });
      })
      .catch((error) => this.setState({ error: error.error }));
  };

  renderCurrentPhotos = () => {
    return (
      <section id="current_photos">
        <h2>Current Photos: </h2>
        <section id="current_photo_list">
          {this.state.currentPhotos.length === 0 ? (
            <p>You currently have no photos for this report</p>
          ) : (
            this.state.currentPhotos.map((photo, index) => {
              return (
                <section className="photo_box" key={`photo_box_${index}`}>
                  <img
                    src={photo}
                    className="current_photo_report"
                    alt={`report_photo ${index}`}
                  />
                  <button
                    type="button"
                    onClick={(e) => this.setConfirmDeletePhoto(photo)}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </button>
                </section>
              );
            })
          )}
        </section>
      </section>
    );
  };

  renderPreviousReports = () => {
    return (
      <section aria-label="Your reports" className="report-list">
        <h1>Previous Reports</h1>
        <ul className="report-list-ul">
          {this.state.reports.map((report) => (
            <Link
              key={report.id}
              to={`/reports/${report.id}`}
              className="reportList-link"
            >
              <li className="report-li" id={report.id}>
                <img
                  className="company-logo"
                  src={report.photos[0]}
                  alt={report.name}
                />
                <p className="information-area">{report.notes}</p>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    let imgsrc = "https://via.placeholder.com/150";
    if (this.state.client.photo) {
      imgsrc = this.state.client.photo;
    }
    return (
      <div className="take-a-report">
        <h1>{this.state.header_text}</h1>
        <div className="basic-client-card">
          <div className="company-logo">
            <img src={imgsrc} alt={this.state.data.name} />
          </div>
          <div className="information-area">
            <h2 id="store-name">{this.state.data.name} </h2>
            <div className="location">{this.state.data.location}</div>
          </div>
        </div>
        <div className="report-input">
          {this.state.confirmingDeletePhoto && this.renderConfirmDeletePhoto()}
          <form
            className="take-a-report-form"
            onSubmit={(e) => this.onFormSubmit(e)}
          >
            <label htmlFor="report-text-input">Write your report:</label>
            <textarea
              type="text"
              id="report-text-input"
              name="report-text-input"
              onChange={this.setNotes}
              value={this.state.notes}
            ></textarea>
            {this.state.currentPhotos ? this.renderCurrentPhotos() : ""}
            <label htmlFor="report-photo-input">Add a photo:</label>
            <input
              type="file"
              multiple="multiple"
              accept="image/*"
              name="report-photo-input"
              id="report-photo-input"
              alt="alt_text"
            ></input>
            <button className="btn" disabled={this.state.submitting}>
              Submit
            </button>
          </form>
          {this.state.submitting ? <p>submitting report...</p> : ""}
        </div>

        {!this.state.mobile ? this.renderPreviousReports() : ""}
      </div>
    );
  }
}

export default withRouter(TakeReport);
