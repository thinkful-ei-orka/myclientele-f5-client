import React from "react";
import { Link } from "react-router-dom";
import UserApiService from "../../services/user-api-service";
import "./EmployeeReportsRoute.scss";
import ReportsApiService from "../../services/reports-api-service";
import ClientApiService from "../../services/client-api-service";

export default class EmployeeReportsRoute extends React.Component {
  state = {
    error: null,
    employee: null,
    reports: null,
    clients: [],
    reportSearch: "",
    loading: true,
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

  async componentDidMount() {
    let user = await UserApiService.getUserContactInfo();
    if (!user.admin) {
      const { history } = this.props;
      history.push("/schedule");
      window.location.reload();
    }
    let employee_id = window.location.pathname.split("/")[2];
    let employee_reports = await ReportsApiService.getReportsBySalesRepId(
      employee_id
    );
    let clients = await ClientApiService.getClientsByCompanyId(user.company_id);
    console.log(clients, "clients!");
    this.setState({
      employee: employee_reports.employee,
      clients: clients.clients,
      reports: employee_reports.reports,
      loading: false,
    });
  }

  setReportSearch = (e) => {
    this.setState({
      reportSearch: e.target.value,
    });
  };

  filterReportsBySearch = () => {
      let reports = [];
      this.state.reports.forEach(report => {
          let client = this.state.clients.find(client => client.id === report.client_id);
          if(client) {
              if(client.name.toLowerCase().includes(this.state.reportSearch.toLowerCase())) {
                  reports.push(report)
              }
          }
      })
      return reports;
  }

  renderReports = () => {
    let reports = this.filterReportsBySearch();
    return (
      <div className="employee_reports_box">
        <div className="employee_info_box">
          <i className="fas fa-user fa-3x"></i>
          <h1 id="employee_name">{this.state.employee.name}</h1>
          <input
            type="text"
            placeholder="Search for report"
            id="employee_report_search_box"
            value={this.state.reportSearch}
            onChange={this.setReportSearch}
          />
        </div>
        {reports.map((report) => {
          const clientData = this.matchReportToClient(report.client_id);
          let imgsrc = "https://via.placeholder.com/150";
          if (report.photos !== []) {
            imgsrc = report.photos[0];
          }
          return (
            <Link
              key={report.id}
              to={`/employees/${this.state.employee.id}/reports/${report.id}`}
              className="reportList-link"
            >
              <div className="employee_report_box">
                <div className="employee-company-logo">
                  <img className="employee-reports-img" src={imgsrc} alt={report.name} />
                </div>
                <div className="employee_information-area">
                  <h2>{clientData.name || `Not assigned`}</h2>
                  <p>{clientData.location}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  render() {
    console.log(this.state.reports);
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="employee_display_reports_box">
        {this.state.reports ? (
          this.renderReports()
        ) : (
          <p>This employee has no reports</p>
        )}
      </div>
    );
  }
}
