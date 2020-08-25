import React from "react";
import { Link } from "react-router-dom";
import ReportsApiService from "../../services/reports-api-service";
import PrivateContext from "../../contexts/PrivateContext";
import "./reportroute.scss";
import ClientApiService from "../../services/client-api-service";
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import UserApiService from "../../services/user-api-service";
import TakeReport from "../../components/TakeReport/TakeReport";
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
class ReportRoute extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      report: null,
      confirmingDelete: false,
      enteringPassword: false,
      editing: false,
      password: "",
      client: [],
      data: null
    };
  }

  renderSwiper = () => {
    //component that renders the photos for each report
    if (this.state.report.photos.length !== 0) {
      let slides = [];
      this.state.report.photos.forEach((photo, index) => {
        slides.push(
          <SwiperSlide key={photo}>
            <img
              src={photo}
              alt={index}
              className="slide_photo"
              key={`slide ${index}`}
            />
          </SwiperSlide>
        );
      });
      return (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {slides}
        </Swiper>
      );
    } else {
      return <p id="no_photos_statement">You don't have any photos for this report</p>
    }
  };

  componentDidMount() {
    if (this.context.clients === null) {
      ClientApiService.getAllClients().then((res) => {
        this.context.updateContext({ clients: res });
      });
    }
    ReportsApiService.getReport(this.props.match.params.report_id).then(
      (res) => {
        let client = this.context.clients.find(
          (client) => client.id === res[0].client_id
        );
        this.setState({
          report: res[0],
          client: client,
        });
      }
    );
  }

  setConfirmDelete = () => {
    this.setState({
      confirmingDelete: !this.state.confirmingDelete,
      enteringPassword: false,
    });
  };

  SetEnteringPassword = () => {
    this.setState({
      enteringPassword: true,
    });
  };

  setPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  renderConfirmingDelete = () => {
    return (
      <div id="confirm_delete_box">
        {this.state.enteringPassword ? (
          <form id="confirm_delete_form" onSubmit={this.deleteReport}>
            <p>
              Please enter your password to confirm you are deleting this report
            </p>
            <label htmlFor="password">Password: </label>
            {this.state.error && <p>{this.state.error}. Please try again</p>}
            <input
              type="password"
              name="password"
              id="confirm_delete_password_input"
              value={this.state.password}
              onChange={this.setPassword}
            />
            <section id="delete_box_buttons">
              <button type="submit" id="confirm_delete_report_button">
                Delete
              </button>
              <button
                type="button"
                id="cancel_delete_report_button"
                onClick={this.setConfirmDelete}
              >
                Cancel
              </button>
            </section>
          </form>
        ) : (
          <>
            <h3>Are you sure you want to delete this report?</h3>
            <br />
            <p>
              You will lose all of your notes and photos for this report.{" "}
              <strong>This cannot be undone!</strong>
            </p>
            <section id="delete_box_buttons">
              <button
                id="confirm_delete_report"
                onClick={this.SetEnteringPassword}
              >
                Confirm
              </button>
              <button id="cancel_delete_report" onClick={this.setConfirmDelete}>
                Cancel
              </button>
            </section>
          </>
        )}
      </div>
    );
  };
  deleteReport = (e) => {
    e.preventDefault();
    console.log(this.state.report.id);
    let password = {
      password: this.state.password,
    };
    UserApiService.confirmPassword(password)
      .then(() => ReportsApiService.deleteReport(this.state.report.id))
      .then(() => {
        this.props.history.push("/reports");
        window.location.reload();
      })
      .catch((res) => {
        this.setState({
          error: res.error,
        });
      });
  };

  setEditing = () => {
    this.setState({
      editing: !this.state.editing,
    });
  };
  render() {
    if (!this.state.report) {
      return <p>Loading...</p>;
    }
    const newDate = new Date(this.state.report.date);
    return (
      <>
        {this.state.editing ? (
          <TakeReport data={this.state.report.id}/>
        ) : (
          <>
            <section className="single-report-section">
              {this.state.confirmingDelete && this.renderConfirmingDelete()}

              <p id="report-date">
                <b>Report Date: </b>
                {`${newDate.toLocaleDateString()} @ ${newDate.toLocaleTimeString()}`}
              </p>
              <section className="report_header">
                <button
                  id="delete_report_button"
                  onClick={this.setConfirmDelete}
                >
                  <i className="fas fa-trash"></i>
                </button>
                <h2>{this.state.client.name}</h2>
                <button id="edit_report_button" onClick={this.setEditing}>
                  <i className="far fa-edit"></i>
                </button>
              </section>
              <h3>Notes:</h3>
              <div className="notes-area">{this.state.report.notes}</div>
              <h3>Photos: </h3>
            </section>
            {Object.keys(this.state.report).length !== 0
              ? this.renderSwiper()
              : ""}
            <div className="zoom_container"></div>
          </>
        )}
      </>
    );
  }
}

export default ReportRoute;
