import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


import ListMapToggle from './ListMapToggle';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ListMapToggle />, div);

  ReactDOM.unmountComponentAtNode(div);
});