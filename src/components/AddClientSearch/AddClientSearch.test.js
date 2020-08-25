import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';


import AddClientSearch from './AddClientSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter>
      <AddClientSearch />
    </MemoryRouter>
    , div);

  ReactDOM.unmountComponentAtNode(div);
});