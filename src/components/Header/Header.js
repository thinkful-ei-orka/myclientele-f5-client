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
    document.addEventListener('mousedown', this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }
  toggleMenu() {
    this.setState((state) => ({ menuOpen: !state.menuOpen }));
  }
  render() {
    if (this.context.user.id == null) {
      return (
        <header>
          <div className='logo'>
            <img src={logo} alt='my clientele logo'></img>
          </div>

          <div className='main-menu'>
            <Menu
              width={'250px'}
              right
              isOpen={this.state.menuOpen}
              onStateChange={(state) => this.handleStateChange(state)}>
              <button
                className='btn'
                onClick={(e) => {
                  this.toggleMenu();
                  this.setLoginOpen(true);
                }}>
                Login
              </button>

              <button
                className='btn'
                onClick={(e) => {
                  this.toggleMenu();
                  this.setSignUpOpen(true);
                }}>
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
          <Menu
            width={'250px'}
            right
            isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}>
            <Link to='/add-client'>
              <button
                onClick={() => this.toggleMenu()}
                className='add-client btn'>
                Add Client
              </button>
            </Link>
            <Link to='/reports'>
              <button onClick={() => this.toggleMenu()} className='reports btn'>
                Reports
              </button>
            </Link>
            <Link to='/my-account'>
              <button
                onClick={() => this.toggleMenu()}
                className='user-info btn'>
                My Account
              </button>
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
