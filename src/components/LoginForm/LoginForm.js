import React from 'react';
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default class LoginForm extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null, loading: false }

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null, loading: true })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
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
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div role='alert'>{error && <p>{error}</p>}</div>

          <label htmlFor="username">Username</label>
          <input type="text" ref={this.firstInput} id="username" name="username" required></input>

          <label htmlFor="password">Password</label>
          <input type="password" ref={this.firstInput} id="password" name="password" required></input>

          {!loading && <button type="submit">Login</button>}
          {loading && <button type="submit" disabled><FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon></button>}
        </form>
      </div>
    );
  }
}
