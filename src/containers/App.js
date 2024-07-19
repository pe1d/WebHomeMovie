import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { path } from '../untils'
import Scrollbars from 'react-custom-scrollbars';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import Login from '../containers/Auth/Login.js'
import Home from '../containers/HomePage/Home.js'
import About from './Auth/About.js';
import './App.scss'
import dMoviePage from './Movie/dMoviePage.js';
import watchMoviePage from './Movie/watchMoviePage.js';
import Main from './mainWatch/Main/Main.js';
function App(props) {
  const handlePersistorState = () => {
    const { persistor } = props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };
  useEffect(() => {
    // handlePersistorState();
  }, []);
  // console.log('check props', props);
  return (
    <Fragment>
      <Router history={history}>
        <div className="main-container">
          <div className="content-container">
            {/* <Scrollbars style={{ height: '100vh', with: '100%' }}> */}
            <Switch>
              <Route path={path.HOME} exact component={(Home)} />
              <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
              <Route path={path.HOMEPAGE} component={userIsAuthenticated(Main)} />
              <Route path={path.ABOUT} component={userIsNotAuthenticated(About)} />
              <Route path={path.DETAILMOVIE} component={userIsAuthenticated(dMoviePage)} />
              <Route path={path.WATCH} component={userIsAuthenticated(watchMoviePage)} />
            </Switch>
            {/* </Scrollbars> */}
          </div>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </Fragment>
  )
}
const mapStateToProps = state => {
  return {
    started: state.app.started,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);