import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { APPPATH, PATHS } from './constants'
import { useState } from 'react';

import SideNavigation from './components/SideNavigation/SideNavigation';
import Header from './components/Header/Header';

import HomePage from './pages/HomePage';
import ShiftRotaPage from './pages/ShiftRotaPage';
import TestPage from './pages/TestPage';
import PageNotFound from './pages/PageNotFound'
import UserInfoPage from './pages/UserInfoPage';
import TokenVerify from './components/TokenVerify/TokenVerify';

import LoginPage from './pages/Login';

import { getUserFromLocalStorage, removeUserFromLocalStorage } from './app/utils';

import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    background: {
      default: '#292929',
      paper: '#1C1C1C',
    },
    text: {
      primary: '#fff',
    }
  },
  typography: {
    fontFamily: 'Campton, sans-serif'
  }
})

function App() {
  const userData = getUserFromLocalStorage();
  const [isLogged, setIsLogged] = useState(Boolean(userData.userType));

  const logout = () => {
    setIsLogged(false);
    removeUserFromLocalStorage();
  }

  const MainContent = () => {
    if (!isLogged) return <LoginPage submitHandler={() => { setIsLogged(true) }} />

    else return <div className="App">
      <div className='header'>
        <Header />
      </div>
      <div className='main'>
        <div className='nav'>
          <SideNavigation onLogout={logout} />
        </div>
        <div className='switch'>
          <Switch>
            <Route path={PATHS.ME}>
              <UserInfoPage />
            </Route>
            <Route path={PATHS.SHIFTROTA}>
              <ShiftRotaPage />
            </Route>
            <Route path={APPPATH}>
              <HomePage />
            </Route>
            <Route>
              <ShiftRotaPage />
            </Route>
          </Switch>
        </div>
      </div>
      <TokenVerify onLogout={logout} />
    </div>

  }

  return (
    <ThemeProvider theme={theme}>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;
