import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom'

import AddClientForm from './AddClientForm';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter>
      <AddClientForm />
    </MemoryRouter>
    , div);

  ReactDOM.unmountComponentAtNode(div);
});