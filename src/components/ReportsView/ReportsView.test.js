import React from 'react';
import ReactDOM from 'react-dom';

import ReportsView from './ReportsView';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ReportsView />, div);

  ReactDOM.unmountComponentAtNode(div);
});