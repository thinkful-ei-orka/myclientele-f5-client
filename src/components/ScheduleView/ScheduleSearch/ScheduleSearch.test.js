import React from 'react';
import ReactDOM from 'react-dom';

import ScheduleSearch from './ScheduleSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ScheduleSearch />, div);

  ReactDOM.unmountComponentAtNode(div);
});