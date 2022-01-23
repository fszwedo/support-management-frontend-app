import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ShiftRotaPage from './pages/ShiftRotaPage';
import SideNavigation from './components/SideNavigation/SideNavigation';
import Header from './components/Header/Header';
import { APPPATH, PATHS } from './constants'

function App() {
  return (
    <div className="App">
      <Header />
      <div className='main'>
        <div className='nav'>
          <SideNavigation />
        </div>
        <div className='switch'>
          <Switch>
            <Route exact path={APPPATH}>
              <HomePage />
            </Route>
            <Route path={PATHS.SHIFTROTA}>
              <ShiftRotaPage />
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
