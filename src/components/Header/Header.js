import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-modal';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

export default function Header() {
  const [loginIsOpen,setLoginOpen] = React.useState(false);
  function openLogin() {
    setLoginOpen(true);
  }
  function closeLogin(){
    setLoginOpen(false);
  }

  const [registrationIsOpen,setRegistrationOpen] = React.useState(false);
  function openRegistration() {
    setRegistrationOpen(true);
  }
  function closeRegistration() {
    setRegistrationOpen(true);
  }

  return (
    <header>
      <div className="logo">
        <FontAwesomeIcon icon={faAdjust}></FontAwesomeIcon>
        My Clientele
      </div>
      <div>
        <button onClick={openLogin}>Open Login</button>
        <Modal isOpen={loginIsOpen} onRequestClose={closeLogin}>
          <LoginForm />
        </Modal>
        <button onClick={openRegistration}>Open Registration</button>
        <Modal isOpen={registrationIsOpen} onRequestClose={closeRegistration}>
          <RegistrationForm />
        </Modal>
      </div>
    </header>
  );
}
