import React from 'react';
import {Route} from 'react-router-dom';
import Profile from './profile';
import BidCreate from "./bid";
import Balance from './balance';
import AddMoney from './balance/add-money'
import MakePayment from './payment/make-payment'


export default [
  <Route exact path="/profile" component={Profile}/>,
  <Route exact path="/bids/create" component={BidCreate}/>,
  <Route exact path="/balance" component={Balance}/>,
  <Route exact path="/pay" component={MakePayment}/>,
  <Route exact path="/balance/add" component={AddMoney}/>
]