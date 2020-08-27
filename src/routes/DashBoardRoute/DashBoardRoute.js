import React from "react";
import EmployeeBox from './EmployeeBox';
import UserApiService from "../../services/user-api-service";
import PrivateContext from "../../contexts/PrivateContext";
import CompaniesApiService from "../../services/companies-api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./DashBoardRoute.scss";

export default class DashBoardRoute extends React.Component {
  // This route is only accessible to administrators.
  static contextType = PrivateContext;

  state = {
    user: null,
    company: null,
    invite_link: "",
    confirmCopy: false,
    employees: null,
    activeEmployees: null,
    inactiveEmployees: null,
    showingActiveEmployees: true,
  };

  async componentDidMount() {
    let user = await UserApiService.getUserContactInfo();
    if (!user.admin) {
      // If user is not an admin, then send them back to the /schedule route
      const { history } = this.props;
      history.push("/schedule");
      window.location.reload();
    }
    // Get company info and list of employees
    let company = await CompaniesApiService.getCompany(user.company_id);
    let employees = await UserApiService.getUsersByCompanyId(user.company_id);
    let activeEmployees = employees.filter(employee => employee.user_disabled === false);
    let inactiveEmployees = employees.filter(employee => employee.user_disabled === true);

    // Invite link is what is used to invite new users to make an account
    let invite_link = `${window.location.origin}/sign-up?code=${company.company_code}`;

    this.setState({
      user,
      company,
      invite_link,
      employees,
      activeEmployees,
      inactiveEmployees
    });
  }

  updateEmployees = async () => {
    let user = await UserApiService.getUserContactInfo();
    let employees = await UserApiService.getUsersByCompanyId(user.company_id);
    let activeEmployees = employees.filter(employee => employee.user_disabled === false);
    let inactiveEmployees = employees.filter(employee => employee.user_disabled === true);

    this.setState({
      employees,
      activeEmployees,
      inactiveEmployees
    });
  }

  renderEmployees = () => {
    if (this.state.showingActiveEmployees) {
      return this.state.activeEmployees.map((employee, index) => {
        return (
          <EmployeeBox employee={employee} key={index} updateEmployees={this.updateEmployees} />
        );
      });
    } else {
      return this.state.inactiveEmployees.map((employee, index) => {
        return (
          <EmployeeBox employee={employee} key={index} updateEmployees={this.updateEmployees}/>
        );
      });
    }

  };

  toggleActiveEmployees = (bool) => {
    this.setState({
      showingActiveEmployees: bool
    })
  }

  confirmCopy = () => {
  // Sets the state to confirm that the user has copied the link to their clipboard
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

    let toggleActiveButton
    if (this.state.showingActiveEmployees) {
      if (this.state.inactiveEmployees.length) { // show the toggle inactive employees button if showing active employees and there are inactive employees
        toggleActiveButton = <button className="btn outline small" onClick={(e) => this.toggleActiveEmployees(false)}>Show inactive employees</button>;
      }
    } else { // show the toggle active employees button if viewing inactive employees
      if (this.state.inactiveEmployees.length === 0) { // if there are no inactive employees, switch back to showing active employees
        this.setState({ showingActiveEmployees: true });
      }
      toggleActiveButton = <button className="btn small" onClick={(e) => this.toggleActiveEmployees(true)}>Show active employees</button>;
    }

    return (
      <>
        <div className="search_and_disabled_container wrapper">
          {toggleActiveButton}
        </div>
        <div className="employees_box wrapper">{this.renderEmployees()}</div>
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
