import React from 'react';

import Header from '../../components/Header/Header';
import Modal from 'react-modal';

export default function HomepageRoute() {
  return (
    <>
      <Header />
      <section>
        <div className="wrapper">
          <button>Sign Up Now!</button>
          <p>Dolore Lorem incididunt dolore est sit aute consectetur cupidatat. Ex velit ipsum cillum tempor incididunt reprehenderit duis do occaecat minim mollit laboris consequat ad.</p>
        </div>
      </section>
      <section>
        <div className="wrapper">
          <div>
            <img src="https://via.placeholder.com/200"></img>
            <p>Tempor magna consectetur proident exercitation laboris. Incididunt mollit amet quis et reprehenderit. Ut eu est est ipsum do eiusmod cillum aliquip amet reprehenderit laboris laboris minim. In culpa quis elit reprehenderit et magna pariatur tempor anim elit excepteur laboris. Mollit aliqua ullamco consectetur eu nostrud magna reprehenderit dolore exercitation nisi tempor dolor.</p>
          </div>
          <div>
            <p>Tempor magna consectetur proident exercitation laboris. Incididunt mollit amet quis et reprehenderit. Ut eu est est ipsum do eiusmod cillum aliquip amet reprehenderit laboris laboris minim. In culpa quis elit reprehenderit et magna pariatur tempor anim elit excepteur laboris. Mollit aliqua ullamco consectetur eu nostrud magna reprehenderit dolore exercitation nisi tempor dolor.</p>
            <img src="https://via.placeholder.com/200"></img>
          </div>
        </div>
      </section>
    </>
  );
}
