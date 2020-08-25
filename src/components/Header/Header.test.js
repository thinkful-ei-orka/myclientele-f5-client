import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';


import Header from './Header';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <div className='App'>
      {/* <MemoryRouter> */}
          <Header />
      {/* </ MemoryRouter> */}
    </div>
    , div);

  ReactDOM.unmountComponentAtNode(div);
});