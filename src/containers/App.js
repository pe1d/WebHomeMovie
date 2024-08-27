import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { path } from '../untils'
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import Login from '../containers/Auth/Login.js'
import Home from '../containers/HomePage/Home.js'
import About from './Auth/About.js';
import './App.scss'
import dMoviePage from './Movie/dMoviePage.js';
import watchMoviePage from './Movie/watchMoviePage.js';
import Main from './mainWatch/Main/Main.js';
import TVPage from './TV/TVPage.js';
import TVSeason from './TV/TVSeason.js';
import { ToastContainer } from 'react-toastify';
function App(props) {
  return (
    <Fragment>
      <Router history={history}>
        <div className="main-container">
          <div className="content-container">
            <Switch>
              <Route path={path.HOME} exact component={(Home)} />
              <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
              <Route path={path.HOMEPAGE} component={userIsAuthenticated(Main)} />
              <Route path={path.ABOUT} component={userIsNotAuthenticated(About)} />
              <Route path={path.DETAILMOVIE} component={userIsAuthenticated(dMoviePage)} />
              <Route path={path.DETAILTV} exact component={userIsAuthenticated(TVPage)} />
              <Route path={path.DETAILSEASONTV} exact component={userIsAuthenticated(TVSeason)} />
              <Route path={path.WATCH} component={userIsAuthenticated(watchMoviePage)} />
            </Switch>
          </div>
        </div>
      </Router>

    </Fragment>
  )
}


export default App;