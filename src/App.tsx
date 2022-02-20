import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { APPPATH, PATHS } from './constants'

import SideNavigation from './components/SideNavigation/SideNavigation';
import Header from './components/Header/Header';

import HomePage from './pages/HomePage';
import ShiftRotaPage from './pages/ShiftRotaPage';
import TestPage from './pages/TestPage';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <Header />
      </div>
      <div className='main'>
        <div className='nav'>
          <SideNavigation />
        </div>
        <div className='switch'>
          <Switch>
            <Route path={PATHS.SHIFTROTA}>
              <ShiftRotaPage />
            </Route>

            <Route path={PATHS.TESTPATH}>
              <TestPage />
            </Route>
            
            <Route path={APPPATH}>
              <HomePage />
            </Route>
            <Route>
              <Redirect to={APPPATH} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
