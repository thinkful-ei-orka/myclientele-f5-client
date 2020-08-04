import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <header>
      <div className="logo">
        <FontAwesomeIcon icon={faAdjust}></FontAwesomeIcon>
        My Clientele
      </div>
      <div>
      </div>
    </header>
  );
}
