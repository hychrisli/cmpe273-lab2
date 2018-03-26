import {
  take,
  fork,
  cancel,
  call,
  put,
  cancelled,
} from "redux-saga/effects";

import history from '../history'

import {handleApiErrors} from "../lib/api-errors";

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "./constants";


import {
  setClient,
  unsetClient
} from "../client/actions";

import {
  CLIENT_UNSET
} from "../client/constants"

const loginUrl = `${process.env.REACT_APP_API_URL}/users/login`;


function loginApi(username, password){
  return fetch(loginUrl, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {throw error})
}

function* logout(){
  yield put(unsetClient());
  localStorage.removeItem('token');
  history.push('/login')
}

function* loginFlow(username, password){
  let token;

  try{
    token = yield call(loginApi, username, password);
    yield put(setClient(token));
    yield put({type: LOGIN_SUCCESS});
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/dashboard');
  } catch(error) {
    yield put({type: LOGIN_ERROR, error});
  } finally {
    if ( yield cancelled()) {
      history.push('/login')
    }
  }
  return token;
}

function* loginWatcher(){

  while(true) {
    const {username, password} = yield take(LOGIN_REQUESTING);
    const task = yield fork(loginFlow, username, password);
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
    if (action.type === CLIENT_UNSET) yield cancel(task);
    yield call(logout);
  }
}

export default loginWatcher