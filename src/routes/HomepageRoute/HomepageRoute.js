import React from 'react';
import Header from '../../components/Header/Header';
import Modal from 'react-modal';
import './Homepage.scss';

export default function HomepageRoute() {
  return (
    <>
      <Header />
      <section className='hero-banner'>
        <div className='hero-text'>
          <button>Sign Up Now!</button>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae,
            sequi, recusandae illo quo, nisi vel eveniet maxime deserunt
            inventore totam esse? Porro molestiae recusandae consectetur quas
            eaque voluptas ipsum totam.
          </p>
        </div>
      </section>

      <section>
        <div className='homepage-extrainfo'>
          <div className='wrapper-left'>
            <img src='https://via.placeholder.com/200'></img>
            <p>
              Tempor magna consectetur proident exercitation laboris. Incididunt
              mollit amet quis et reprehenderit. Ut eu est est ipsum do eiusmod
              cillum aliquip amet reprehenderit laboris
            </p>
          </div>
          <div className='wrapper-right'>
            <p>
              Tempor magna consectetur proident exercitation laboris. Incididunt
              mollit amet quis et reprehenderit. Ut eu est est ipsum do eiusmod
              cillum aliquip amet reprehenderit laboris laboris minim. In culpa
            </p>
            <img src='https://via.placeholder.com/200'></img>
          </div>
        </div>
      </section>
    </>
  );
}
