import React from 'react';
import logo from '../../images/logo.png';
import './Header.scss';

import Modal from 'react-modal';
import { withRouter, Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import UserContext from '../../contexts/UserContext';

class Header extends React.Component {
  state = {
    loginIsOpen: false,
    signUpIsOpen: false,
  };

  static contextType = UserContext;

  setLoginOpen = (bool) => {
    this.setState({ loginIsOpen: bool });
  };

  setSignUpOpen = (bool) => {
    this.setState({ signUpIsOpen: bool });
  };

  handleLogOut = () => {
    this.context.processLogout();
  };

  componentDidMount() {
    Modal.setAppElement('.App');
    if (this.props.location.pathname === '/login') {
      this.setLoginOpen(true);
    }
    if (this.props.location.pathname === '/sign-up') {
      this.setSignUpOpen(true);
    }
  }

  render() {
    if (this.context.user.id == null) {
      console.log(this.context.user);
      return (
        <header>
          <div className='logo'>
            <img src={logo} alt='my clientele logo'></img>
          </div>
          <div className='login-buttons'>
            <button className='btn' onClick={(e) => this.setLoginOpen(true)}>
              Login
            </button>
            <Modal
              isOpen={this.state.loginIsOpen}
              onRequestClose={(e) => this.setLoginOpen(false)}>
              <LoginForm closeModal={(e) => this.setLoginOpen(false)} />
            </Modal>
            <button className='btn' onClick={(e) => this.setSignUpOpen(true)}>
              Sign Up
            </button>
            <Modal
              isOpen={this.state.signUpIsOpen}
              onRequestClose={(e) => this.setSignUpOpen(false)}>
              <SignUpForm closeModal={(e) => this.setSignUpOpen(false)} />
            </Modal>
          </div>
        </header>
      );
    }

    return (
      <header>
        <div className='logo'>
          <img src={logo} alt='my clientele logo'></img>
        </div>
        <button
          className='logout-button btn'
          onClick={() => this.handleLogOut()}>
          Logout
        </button>
        <Link to='/form'>
          <button className='add-client btn'>Add Client</button>
        </Link>
      </header>
    );
  }
}

export default withRouter(Header);
