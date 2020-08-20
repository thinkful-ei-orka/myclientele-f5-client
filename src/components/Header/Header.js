import React from 'react';
import logo from '../../images/logo.png';
import './Header.scss';
import './hamburger.scss';

import Modal from 'react-modal';
import { withRouter, Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import UserContext from '../../contexts/UserContext';
import hamburger from '../../images/hamburger.svg';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { slide as Menu } from 'react-burger-menu';

class Header extends React.Component {
  state = {
    loginIsOpen: false,
    signUpIsOpen: false,
    menuOpen: false,
  };
  showSettings(event) {
    event.preventDefault();
  }

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
      return (
        <header>
          <div className='logo'>
            <img src={logo} alt='my clientele logo'></img>
          </div>

          <div className='main-menu'>
            <Menu right>
              <button className='btn' onClick={(e) => this.setLoginOpen(true)}>
                Login
              </button>

              <button className='btn' onClick={(e) => this.setSignUpOpen(true)}>
                Sign Up
              </button>
            </Menu>
          </div>

          <Modal
            isOpen={this.state.loginIsOpen}
            onRequestClose={(e) => this.setLoginOpen(false)}>
            <LoginForm closeModal={(e) => this.setLoginOpen(false)} />
          </Modal>
          <Modal
            isOpen={this.state.signUpIsOpen}
            onRequestClose={(e) => this.setSignUpOpen(false)}>
            <SignUpForm closeModal={(e) => this.setSignUpOpen(false)} />
          </Modal>
        </header>
      );
    }

    return (
      <header>
        <div className='logo'>
          <Link to='/schedule'>
            <img src={logo} alt='my clientele logo'></img>
          </Link>
        </div>

        <div className='main-menu'>
          <Menu right isOpen={this.state.menuOpen}>
            <Link to='/add-client'>
              <button className='add-client btn'>Add Client</button>
            </Link>
            <Link to='/reports'>
              <button className='reports btn'>Reports</button>
            </Link>
            <Link to='/my-account'>
              <button className='user-info btn'>My Account</button>
            </Link>
            <button
              className='logout-button btn'
              onClick={() => this.handleLogOut()}>
              Logout
            </button>
          </Menu>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
