import React from 'react';
import {Route} from 'react-router-dom';
import Profile from './profile';
import BidCreate from "./bid";
import Balance from './balance';


export default [
  <Route exact path="/profile" component={Profile}/>,
  <Route exact path="/bids/create" component={BidCreate}/>,
  <Route exact path="/balance" component={Balance}/>
]