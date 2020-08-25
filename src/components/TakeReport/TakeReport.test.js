import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter} from 'react-router-dom';
import PrivateRoute from "../PrivateRoute/PrivateRoute";



import TakeReport from './TakeReport';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter>
        <PrivateRoute path="/take-report" component={TakeReport} />
    </MemoryRouter>
    , div);

  ReactDOM.unmountComponentAtNode(div);
});