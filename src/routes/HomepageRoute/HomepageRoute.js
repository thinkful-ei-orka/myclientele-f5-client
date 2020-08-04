import React from 'react';

import Header from '../../components/Header/Header';
import Modal from 'react-modal';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function HomepageRoute() {
  const [signUpIsOpen,setSignUpOpen] = React.useState(false);
  function openSignUp() {
    setSignUpOpen(true);
  }
  function closeSignUp() {
    setSignUpOpen(true);
  }

  return (
    <>
      <Header />
      <section>
        <div className="wrapper">
          <button onClick={openSignUp}>Sign Up Now!</button>
          <Modal isOpen={signUpIsOpen} onRequestClose={closeSignUp}>
            <SignUpForm />
          </Modal>
          <p>Dolore Lorem incididunt dolore est sit aute consectetur cupidatat. Ex velit ipsum cillum tempor incididunt reprehenderit duis do occaecat minim mollit laboris consequat ad.</p>
        </div>
      </section>
      <section>
        <div className="wrapper">
          <div>
            <img src="https://via.placeholder.com/200" alt="placeholder"></img>
            <p>Tempor magna consectetur proident exercitation laboris. Incididunt mollit amet quis et reprehenderit. Ut eu est est ipsum do eiusmod cillum aliquip amet reprehenderit laboris laboris minim. In culpa quis elit reprehenderit et magna pariatur tempor anim elit excepteur laboris. Mollit aliqua ullamco consectetur eu nostrud magna reprehenderit dolore exercitation nisi tempor dolor.</p>
          </div>
          <div>
            <p>Tempor magna consectetur proident exercitation laboris. Incididunt mollit amet quis et reprehenderit. Ut eu est est ipsum do eiusmod cillum aliquip amet reprehenderit laboris laboris minim. In culpa quis elit reprehenderit et magna pariatur tempor anim elit excepteur laboris. Mollit aliqua ullamco consectetur eu nostrud magna reprehenderit dolore exercitation nisi tempor dolor.</p>
            <img src="https://via.placeholder.com/200" alt="placeholder"></img>
          </div>
        </div>
      </section>
    </>
  );
}
