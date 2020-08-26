import React from "react";
import { Link } from "react-router-dom";
import "./EmployeeReportView.scss";
import UserApiService from "../../services/user-api-service";
import ReportApiService from "../../services/reports-api-service";
import ClientApiService from "../../services/client-api-service";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default class EmployeeReportView extends React.Component {
  //Only accessible to administrators.
  //This route is used to view an indidivual report for an employee
  state = {
    error: null,
    report: null,
    client: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      let user = await UserApiService.getUserContactInfo();
      if (!user.admin) {
        //Redirect if user is not an admin
        const { history } = this.props;
        history.push("/schedule");
        window.location.reload();
      }
      //Get emloyee report
      let employee_id = window.location.pathname.split("/")[2];
      let report_id = window.location.pathname.split("/")[4];
      let employee_report = await ReportApiService.getReport(report_id);
      employee_report = employee_report[0];
      if (
        Number(employee_report.sales_rep_id) !== Number(employee_id) ||
        !employee_report
      ) {
        this.setState({
          error: "Invalid report",
          loading: false,
        });
      } else {
        //If report exists then also get the client information
        let client = await ClientApiService.getClient(
          employee_report.client_id
        );
        this.setState({
          report: employee_report,
          client,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        error: error.error,
        loading: false,
      });
    }
  };

  renderReport() {
    let { report } = this.state;
    return (
      <>
        <div id="employee_report_info">
          <div id="client_report_info">
            <h2>{this.state.client.name}</h2>
            <p>{this.state.client.location}</p>
          </div>
          <p>Notes: {report.notes}</p>
          <Link
            to={{
              pathname: `/employees/${this.state.report.sales_rep_id}/reports`,
            }}
          >
            <button className="btn dark">Return</button>
          </Link>
          <h3>Photos: </h3>
        </div>
        {Object.keys(this.state.report).length !== 0 ? this.renderSwiper() : ""}
      </>
    );
  };

  renderSwiper = () => {
    if (this.state.report.photos) {
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
      let center = window.outerWidth * 0.2;
      return (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          slidesOffsetBefore={center}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {slides}
        </Swiper>
      );
    } else {
      console.log("no photos");
    }
  };

  render() {
    if (this.state.loading) {
      return <p>loading</p>;
    }
    return (
      <div className="employee_admin_report_box">
        <div className="employee_info"></div>
        {this.state.error ? (
          <div className="error_box">
            <p id="error_statement">
              {this.state.error}. Please return to dashboard.
            </p>
            <Link
              to={{
                pathname: "/dashboard",
              }}
            >
              <button className="btn dark">Return</button>
            </Link>
          </div>
        ) : this.state.report ? (
          this.renderReport()
        ) : (
          <p>Invalid report</p>
        )}
      </div>
    );
  }
}
