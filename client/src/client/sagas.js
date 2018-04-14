import {CLIENT_UNSET} from './constants'

import history from "../history";
import {call, takeLatest} from "redux-saga/effects";
import {handleApiErrors} from "../lib/api-errors";

const logoutUrl = `${process.env.REACT_APP_API_URL}/session`;


function logoutApi(){

  const storedToken = localStorage.getItem('token');
  const token = JSON.parse(storedToken);

  return fetch(logoutUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {throw error})
}

function* unset(){
  yield call(logoutApi);
  yield localStorage.removeItem('token');
  history.push('/login');
}

function* unsetWatcher(){
  yield takeLatest(CLIENT_UNSET, unset)
}

export default unsetWatcher;
