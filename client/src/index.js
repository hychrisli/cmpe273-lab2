import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import createSageMiddleware from 'redux-saga'
import {Route, Router, Switch} from 'react-router-dom';

import App from './App';

import Signup from './signup';
import history from './history';
import './index.css';

import IndexReducer from './index-reducer';
import IndexSagas from './index-saga';

import {
  checkIndexAuthorization,
  checkWidgetAuthorization,
  checkLoginAuthorization
} from './lib/check-auth'


//Set up middleware
const sagaMiddleware = createSageMiddleware();

/*eslint-disable */
/*To use the redux devtool*/
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/*eslint-enable */

// redux store
export const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path={"/"} render={checkIndexAuthorization(store)}/>
          <Route path={"/login"} render={checkLoginAuthorization(store)}/>
          <Route path={"/signup"} component={Signup}/>
          <Route path={"/dashboard"} render={checkWidgetAuthorization(store)}/>
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);

