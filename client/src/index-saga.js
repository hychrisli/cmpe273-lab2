import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import profileSaga from './dashboard/profile/sagas'
import ClientSaga from './client/sagas'
import BidSaga from './dashboard/bid/sagas'


export default function* IndexSage(){
  yield[
    SignupSaga(),
    LoginSaga(),
    profileSaga(),
    ClientSaga(),
    BidSaga()
  ]
}