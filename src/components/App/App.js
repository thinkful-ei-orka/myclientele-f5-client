import React from 'react';
import './App.scss';
import ScheduleRoute from '../../routes/ScheduleRoute/ScheduleRoute';
import Header from '../Header/Header';

// import HomepageRoute from '../../routes/HomepageRoute/HomepageRoute';

export default function App() {
  return (
    <div className='App'>
      <Header />
      <ScheduleRoute />
    </div>
  );
}
