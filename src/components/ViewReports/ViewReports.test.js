import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


import ViewReports from './ViewReports';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ViewReports />, div);

  ReactDOM.unmountComponentAtNode(div);
});