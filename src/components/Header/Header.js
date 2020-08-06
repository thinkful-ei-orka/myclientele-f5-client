import React from 'react';
import logo from '../../images/logo.png';
import './Header.scss';

import Modal from 'react-modal';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';

export default class Header extends React.Component {
  state = {
    loginIsOpen: false,
    signUpIsOpen: false,
  };

  setLoginOpen = (bool) => {
    this.setState({ loginIsOpen: bool });
  };

  setSignUpOpen = (bool) => {
    this.setState({ signUpIsOpen: bool });
  };

  render() {
    return (
      <header>
        <div className='logo'>
          <img src={logo} alt='my clientele logo'></img>
        </div>
        <div className='login-buttons'>
          <button
            className='header-button'
            onClick={(e) => this.setLoginOpen(true)}>
            Login
          </button>
          <Modal
            isOpen={this.state.loginIsOpen}
            onRequestClose={(e) => this.setLoginOpen(false)}>
            <LoginForm closeModal={(e) => this.setLoginOpen(false)} />
          </Modal>
          <button
            className='header-button'
            onClick={(e) => this.setSignUpOpen(true)}>
            Sign Up
          </button>
          <Modal
            isOpen={this.state.signUpIsOpen}
            onRequestClose={(e) => this.setSignUpOpen(false)}>
            <SignUpForm closeModal={(e) => this.setSignUpOpen(false)} />
          </Modal>
        </div>
        <div></div>
      </header>
    );
  }
}
