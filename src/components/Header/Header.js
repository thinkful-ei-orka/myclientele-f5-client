import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.png';
import './Header.scss';

import Modal from 'react-modal';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';

export default function Header() {
  const [loginIsOpen, setLoginOpen] = React.useState(false);
  function openLogin() {
    setLoginOpen(true);
  }
  function closeLogin() {
    setLoginOpen(false);
  }

  const [signUpIsOpen, setSignUpOpen] = React.useState(false);
  function openSignUp() {
    setSignUpOpen(true);
  }
  function closeSignUp() {
    setSignUpOpen(true);
  }

  return (
    <header>
      <div className='logo'>
        <img src={logo} alt='my clientele logo'></img>
      </div>
      <div className='login-buttons'>
        <button onClick={openLogin}>Login</button>
        <Modal isOpen={loginIsOpen} onRequestClose={closeLogin}>
          <LoginForm />
        </Modal>
        <button onClick={openSignUp}>Sign Up</button>
        <Modal isOpen={signUpIsOpen} onRequestClose={closeSignUp}>
          <SignUpForm />
        </Modal>
      </div>
      <div></div>
    </header>
  );
}
