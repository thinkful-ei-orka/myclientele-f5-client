import React from "react";
import { Link } from "react-router-dom";
import UserApiService from "../../services/user-api-service";
import PrivateContext from "../../contexts/PrivateContext";
import CompaniesApiService from "../../services/companies-api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./DashBoardRoute.scss";
export default class DashBoardRoute extends React.Component {
  //This route is only accessible to administrators.
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
      //If user is not an admin, then send them back to the /schedule route
      const { history } = this.props;
      history.push("/schedule");
      window.location.reload();
    }
    //Get company info and list of employees
    let company = await CompaniesApiService.getCompany(user.company_id);
    let employees = await UserApiService.getUsersByCompanyId(user.company_id);
    //Invite link is what is used to invite new users to make an account
    let invite_link = `${window.location.origin}/sign-up?code=${company.company_code}`;
    this.setState({
      user,
      company,
      invite_link,
      employees,
    });
  }
  renderEmployees = () => {
    return this.state.employees.map((employee, index) => {
      return (
          <div className="employee_box" key={`employee ${index}`}>
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
              <button className="employee_button dark btn">
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
  //Sets the state to confirm that the user has copied the link to their clipboard
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
            <input id="invite_link" value={this.state.invite_link} readOnly></input>
            <CopyToClipboard text={this.state.invite_link}>
              <button onClick={this.confirmCopy} className="btn">
                <i className="fas fa-clipboard"></i>
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
