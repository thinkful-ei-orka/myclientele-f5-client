import React from 'react';
import ReactDOM from 'react-dom';

import { GoogleMap } from '@react-google-maps/api';
import GoogleMapComponent from './GoogleMap';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<GoogleMapComponent />, div);

  ReactDOM.unmountComponentAtNode(div);
});