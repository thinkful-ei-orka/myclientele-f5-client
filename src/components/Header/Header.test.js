import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Modal from 'react-modal';
import userContext from '../../contexts/UserContext';

import Header from './Header';

const router = {
  userContext: userContext
}
Modal.setAppElement(document.createElement('div'))
it('renders without crashing', () => {
  // Modal.setAppElement = () => null;

  const createContext = () => ({
    context: { router }
  })
  const div = document.createElement('div');

  ReactDOM.render(
    <div className='App'>
      <MemoryRouter>
          <Header className='App' context={createContext()}/>
      </ MemoryRouter>
    </div>
    , div);

  ReactDOM.unmountComponentAtNode(div);
});