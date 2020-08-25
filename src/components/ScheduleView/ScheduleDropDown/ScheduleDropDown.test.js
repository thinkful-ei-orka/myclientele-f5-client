import React from 'react';
import ReactDOM from 'react-dom';

import ScheduleDropDown from './ScheduleDropDown';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ScheduleDropDown />, div);

  ReactDOM.unmountComponentAtNode(div);
});