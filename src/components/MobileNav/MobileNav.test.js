import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import MobileNav from './MobileNav';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter>
      <MobileNav />
    </ MemoryRouter>
    , div);

  ReactDOM.unmountComponentAtNode(div);
});