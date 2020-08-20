import React from "react";
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../LoginForm/loginform.scss";

import "./SignUpForm.scss";
import CompaniesApiService from "../../services/companies-api-service";

class SignUpForm extends React.Component {
  static contextType = UserContext;

  state = {
    error: null,
    code: null,
    loading: false,
    confirmingCode: false,
    initialConfirm: true,
    creatingNewCompany: false
  };

  handleRegistrationSuccess = (user) => {
    const { history } = this.props;
    history.push("/login");
    window.location.reload();
  };
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ error: null, loading: true, login_success: false });
    const {
      first_name,
      last_name,
      user_name,
      password,
      retype_password,
      company_name,
      company_location,
      email,
      phone_number,
    } = ev.target;
    const name = `${first_name.value} ${last_name.value}`;
    const verifyMatchingPasswords = this.verifyPasswords(
      password.value,
      retype_password.value
    );
    if (!verifyMatchingPasswords) {
      this.setState({
        loading: false,
        error: "Passwords do not match.  Please try again",
      });
    } else {
      AuthApiService.postUser({
        name: name,
        user_name: user_name.value,
        password: password.value,
        company_name: company_name.value,
        company_location: company_location.value,
        admin: false,
        email: email.value,
        phone_number: phone_number.value,
      })
        .then((res) => {
          first_name.value = "";
          last_name.value = "";
          email.value = "";
          phone_number.value = "";
          company_name.value = "";
          company_location.value = "";
          user_name.value = "";
          password.value = "";

          // this.context.processLogin(res.authToken);
          this.handleRegistrationSuccess();
        })
        .catch((res) => {
          this.setState({ error: res.error, loading: false });
        });
    }
  };

  verifyPasswords(a, b) {
    return a === b;
  }

  SignUpForm = () => {
    const { error } = this.state;
    const loading = this.state.loading;
    return (
      <form onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>

        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          ref={this.firstInput}
          id="first_name"
          name="first_name"
          required
        ></input>

        <label htmlFor="last_name">Last Name</label>
        <input type="text" id="last_name" name="last_name" required></input>

        <label htmlFor="email">Email Address</label>
        <input type="text" id="email" name="email" required></input>

        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          required
        ></input>

        <label htmlFor="company_name">Company</label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          required
        ></input>

        <label htmlFor="company_location">Company Address</label>
        <textarea
          id="company_location"
          name="company_location"
          required
        ></textarea>

        <label htmlFor="user_name">Username</label>
        <input type="text" id="user_name" name="user_name" required></input>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required></input>
        <label htmlFor="retype_password">Retype Password</label>
        <input
          type="password"
          id="retype_password"
          name="retype_password"
          required
        ></input>

        <div className="buttons-on-login">
          {!loading && (
            <button className="btn" type="submit">
              Sign Up
            </button>
          )}
          {loading && (
            <button type="submit" className="btn" disabled>
              <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>
            </button>
          )}
          <button className="outline btn" onClick={this.props.closeModal}>
            Cancel
          </button>
        </div>
      </form>
    );
  };

  renderInitialConfirm = () => {
    return ( 
      <div id="initial_confirm_box">
        <p id="welcome_confirm">Welcome! Are you registering under an existing company?</p>
        <section id="initial_buttons">
          <button onClick={this.confirmExistingCompany}>Yes</button>
          <button onClick={this.confirmCreateNewCompany}>No</button>
        </section>
      </div>
    )
  }

  confirmCreateNewCompany = () => {
    this.setState({
      initialConfirm: false,
      creatingNewCompany: true
    })
  }

  confirmExistingCompany = async () => {
    this.setState({
      confirmingCode: true
    })
    let company = await CompaniesApiService.getCompanyByCode(this.state.code);
  }

  componentDidMount() {
    let query = window.location.search.substring(1).split("&");
    let code = null;
    query.forEach((param) => {
      if (param.includes("code=")) {
        code = param.split("=")[1];
      }
    });
    this.setState({
      code: code,
    });
  }

  render() {
    console.log(this.state.code);
    return (
      <div className="user-login">
        <h2>Sign Up</h2>
        {this.state.confirmingCode && <p>Confirming invitation link...</p>}
        {this.state.initialConfirm && this.renderInitialConfirm()}
        {this.state.creatingNewCompany && this.SignUpForm()}
        {this.state.confirmExistingCompany }
      </div>
    );
  }
}

export default withRouter(SignUpForm);
