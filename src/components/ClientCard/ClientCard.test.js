import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter} from 'react-router-dom';

import ClientCard from './ClientCard';

it('renders without crashing', () => {

  const data = {
    id: 1,
    name: 'test-name',
    location: 'test-location',
    sales_rep_id: 1,
    company_id: 1,
    lat: null,
    lng: null,
    photo: '',
    hours_of_operation: 'Mo-Su',
    currently_closed: false,
    general_manager: 'test-gm',
    notes: 'test-notes',
    day_of_week: 2
  }
  const div = document.createElement('div');

  ReactDOM.render(
    <div className='App'>
      <MemoryRouter>
          <ClientCard data={data} />
      </ MemoryRouter>
    </div>
    , div);

  ReactDOM.unmountComponentAtNode(div);
});