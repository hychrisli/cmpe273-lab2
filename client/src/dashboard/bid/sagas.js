import {call, put, takeLatest} from 'redux-saga/effects';
import {handleApiErrors} from '../../lib/api-errors'
import {BID_SUCCESS, BIDDING, BID_ERROR} from './constants';

const bidUrl = `${process.env.REACT_APP_API_URL}/bids`;

function bidApi(body) {
  return fetch(bidUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json=>json)
    .catch(error => {throw error})
}

function* bidFlow(action) {
  try{
    const {values} = action;
    const body = {
      user_id: values.userId,
      project_id: values.projectId,
      employer_id: values.employerId,
      bid_price: values.bidPrice,
      bid_days: values.bidDays,
    };
    yield call(bidApi,body);
    yield put({type: BID_SUCCESS});
  } catch (error) {
    console.log(error);
    yield put({type: BID_ERROR, error})
  }
}

function* bidWatcher(){
  yield takeLatest(BIDDING, bidFlow);
}

export default bidWatcher;