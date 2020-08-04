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
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        />
      </div>
    </header>
  );
}
