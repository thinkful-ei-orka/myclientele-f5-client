import React from 'react';
import ReactDOM from 'react-dom';

import OpenOrClosed from './OpenOrClosed';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<OpenOrClosed />, div);

  ReactDOM.unmountComponentAtNode(div);
});