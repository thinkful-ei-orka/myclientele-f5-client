import React from "react";
import { Link } from "react-router-dom";
import UserApiService from "../../services/user-api-service";
import PrivateContext from "../../contexts/PrivateContext";
import CompaniesApiService from "../../services/companies-api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard, contextType } from "react-copy-to-clipboard";

import "./DashBoardRoute.scss";

export default class DashBoardRoute extends React.Component {
  static contextType = PrivateContext;
  state = {
    user: null,
    company: null,
    invite_link: "",
    confirmCopy: false,
    employees: null,
  };

  async componentDidMount() {
    let user = await UserApiService.getUserContactInfo();
    if (!user.admin) {
      const { history } = this.props;
      history.push("/schedule");
      window.location.reload();
    }
    let company = await CompaniesApiService.getCompany(user.company_id);
    let employees = await UserApiService.getUsersByCompanyId(user.company_id);
    let invite_link = `${window.location.origin}/sign-up?code=${company.company_code}`;
    this.setState({
      user,
      company,
      invite_link,
      employees,
    });
  }
  renderEmployees = () => {
    console.log(this.state.company);
    return this.state.employees.map((employee) => {
      return (
        <div className="employee_box">
          <i className="fas fa-user fa-3x"></i>
          <h2 className="employee_name">{employee.name}</h2>
          <p>Username: {employee.user_name}</p>
          <div className="employee_buttons">
            <Link
              to={{
                pathname: `/employees/${employee.id}/clients`,
                state: {
                  data: this.props.data,
                },
              }}
            >
              <button className="employee_button employee_client_button btn">
                <FontAwesomeIcon icon={faUsers} />
                Clients
              </button>
            </Link>
            <Link
              to={{
                pathname: `/employees/${employee.id}/reports`,
                state: {
                  data: this.props.data,
                },
              }}
            >
              <button className="employee_button employee_report_button btn">
                <FontAwesomeIcon icon={faFileAlt} />
                Reports
              </button>
            </Link>
          </div>
        </div>
      );
    });
  };

  confirmCopy = () => {
    if (!this.state.confirmCopy) {
      this.setState({
        confirmCopy: true,
      });
    }
  };

  render() {
    if (!this.state.employees) {
      return <p>Loading...</p>;
    }
    return (
      <>
        <div className="employees_box">{this.renderEmployees()}</div>
        <div className="add_employee_box">
          <div className="tooltip_box">
            <p>Add New Employee! </p><div className="tooltip">
          <FontAwesomeIcon icon={faInfoCircle} id="help_icon" />
          <p className="tooltiptext">
              Send this link to your new employees so they can make a new account!
          </p>
        </div>
          </div>
          <div className="copy_link_box">
            <input id="invite_link" value={this.state.invite_link}></input>
            <CopyToClipboard text={this.state.invite_link}>
              <button onClick={this.confirmCopy} className="btn">
                <i class="fas fa-clipboard"></i>
              </button>
            </CopyToClipboard>
          </div>
          {this.state.confirmCopy && (
            <p id="copy_confirm">Copied to clipboard!</p>
          )}
        </div>
      </>
    );
  }
}
