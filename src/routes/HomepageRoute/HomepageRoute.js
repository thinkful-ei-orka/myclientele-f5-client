import React from 'react';
import Header from '../../components/Header/Header';
import Modal from 'react-modal';
import './Homepage.scss';
import map from '../../images/homepage/map.png';
import counting from '../../images/homepage/counting-money.jpg';

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
            <img src={counting}></img>
            <p>
              Start saving money by reducing missed leads and ensure correct
              product ordering for all of your clients.
            </p>
          </div>
          <div className='wrapper-right'>
            <p>
              Integrated map and routing to ensure timely check-ins to each of
              your clients.
            </p>
            <img src={map}></img>
          </div>
        </div>
      </section>
    </>
  );
}
