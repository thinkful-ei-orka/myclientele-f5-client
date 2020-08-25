import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './loginform.scss';

class LoginForm extends React.Component {
  static contextType = UserContext;

  state = { error: null, loading: false };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ error: null, loading: true });

    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = '';
        password.value = '';

        this.context.processLogin(res.authToken);
        this.props.history.push('/schedule');
      })
      .catch((res) => {
        this.setState({ error: res.error, loading: false });
      });
  };

  firstInput = React.createRef();

  componentDidMount() {
    this.firstInput.current.focus();
  };

  render() {
    const { error } = this.state;
    const loading = this.state.loading;

    return (
      <div className='user-login'>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div role='alert'>{error && <p>{error}</p>}</div>

          <label htmlFor='user_name'>Username</label>
          <input
            type='text'
            ref={this.firstInput}
            id='user_name'
            name='user_name'
            required></input>

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            required></input>

          <div className='buttons-on-login'>
            {!loading && (
              <button className='btn' type='submit'>
                Login
              </button>
            )}
            {loading && (
              <button className='btn' type='submit' disabled>
                <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>
              </button>
            )}
            <button className='outline btn' onClick={this.props.closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
