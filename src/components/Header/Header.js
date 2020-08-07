import React from 'react';
import logo from '../../images/logo.png';
import './Header.scss';

import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';

class Header extends React.Component {
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
    return (
      <header>
        <div className='logo'>
          <img src={logo} alt='my clientele logo'></img>
        </div>
        <div className='login-buttons'>
          <button onClick={(e) => this.setLoginOpen(true)}>Login</button>
          <Modal
            isOpen={this.state.loginIsOpen}
            onRequestClose={(e) => this.setLoginOpen(false)}>
            <LoginForm closeModal={(e) => this.setLoginOpen(false)} />
          </Modal>
          <button onClick={(e) => this.setSignUpOpen(true)}>Sign Up</button>
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

export default withRouter(Header);
