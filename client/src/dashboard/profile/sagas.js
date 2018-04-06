import {call, put, takeLatest } from 'redux-saga/effects'
import {handleApiErrors} from '../../lib/api-errors'
import {
  PROFILE_UPDATING,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_SUCCESS,
} from "./constants";

import {setClient} from "../../client/actions";
const profileUrl = `${process.env.REACT_APP_API_URL}/users`;


function pUpdApi(username, body){
  console.log(body);
  return fetch(profileUrl + '/' + username, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {throw error})
}


function* pUpdFlow(action){
  try{
    console.log(action);
    const {values} = action;
    const username = values.username;
/*    let body = {};
    if (values.email !== undefined) body['email'] = values.email;
    if (values.password !== undefined) body['password'] = values.password;
    if (values.firstName !== undefined) body['first_name'] = values.firstName;
    if (values.lastName !== undefined) body['last_name'] = values.lastName;
    if (values.aboutMe !== undefined) body['about_me'] = values.aboutMe;*/

    console.log(values);
    const token = yield call(pUpdApi, username, values);
    localStorage.setItem('token', JSON.stringify(token));
    yield put(setClient(token));
    yield put({type: PROFILE_UPDATE_SUCCESS});
  } catch(error){
    yield put({type: PROFILE_UPDATE_ERROR, error});
  }
}

function* pUpdWatcher() {
  yield takeLatest(PROFILE_UPDATING, pUpdFlow);
}

export default pUpdWatcher;