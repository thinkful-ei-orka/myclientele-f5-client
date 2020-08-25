import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


import GoogleSearchBar from './GoogleSearchBar';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<GoogleSearchBar />, div);

  ReactDOM.unmountComponentAtNode(div);
});