import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.png';
import './Header.scss';

export default function Header() {
  return (
    <header>
      <div className='logo'>
        <img src={logo} alt='my clientele logo'></img>
      </div>
      <div></div>
    </header>
  );
}
