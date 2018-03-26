import {CLIENT_UNSET} from './constants'

import history from "../history";
import {takeLatest} from "redux-saga/effects";

function* unset(){
  yield localStorage.removeItem('token');
  history.push('/login');
}

function* unsetWatcher(){
  yield takeLatest(CLIENT_UNSET, unset)
}

export default unsetWatcher;
