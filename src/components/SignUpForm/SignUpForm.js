import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default class SignUpForm extends React.Component {
  static defaultProps = {
    // onRegistrationSuccess: () => { } // not sure what the naming convention will be
    onSignUpSuccess: () => { }
  }

  state = { error: null, loading: false }

  handleSubmit = ev => {
    this.setState({ loading: true })
    ev.preventDefault()

    const { firstName, lastName, emailAddress, phoneNumber, companyName, companyAddress, username, password } = ev.target;

    AuthApiService.postUser({
      firstName: firstName.value,
      lastName: lastName.value,
      emailAddress: emailAddress.value,
      phoneNumber: phoneNumber.value,
      companyName: companyName.value,
      companyAddress: companyAddress.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        firstName.value = '';
        lastName.value = '';
        emailAddress.value = '';
        phoneNumber.value = '';
        companyName.value = '';
        companyAddress.value = '';
        username.value = '';
        password.value = '';
        // this.props.onRegistrationSuccess()
        this.props.onSignUpSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error, loading: false })
      })
  }

  firstInput = React.createRef()
  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    const loading = this.state.loading;

    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div role='alert'>{error && <p>{error}</p>}</div>

          <label htmlFor="firstName">First Name</label>
          <input type="text" ref={this.firstInput} id="firstName" name="firstName" required></input>

          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" required></input>

          <label htmlFor="emailAddress">Email Address</label>
          <input type="text" id="emailAddress" name="emailAddress" required></input>

          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" id="phoneNumber" name="phoneNumber" required></input>

          <label htmlFor="companyName">Company</label>
          <input type="text" id="companyName" name="companyName" required></input>

          <label htmlFor="companyAddress">Company Address</label>
          <textarea id="companyAddress" name="companyAddress" required></textarea>

          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required></input>

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required></input>

          {!loading && <button type="submit">Sign Up</button>}
          {loading && <button type="submit" disabled><FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon></button>}
        </form>
      </div>
    );
  }
}
