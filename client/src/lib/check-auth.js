import React from 'react'
import {setClient} from '../client/actions'
import {Route, Redirect} from 'react-router-dom'
import Dashboard from "../dashboard";
import Login from '../login';


export function checkIndexAuthorization({dispatch}){
  return () => {
    if (checkAuthorization(dispatch)) {
      return <Redirect to={"/dashboard"}/>;
    }
    return <Redirect to={"/login"}/>;
  }
}

export function checkLoginAuthorization({dispatch, getState}) {
  return ()=>{

    const client = getState().client;
    if ( client && client.token) return <Redirect to={"/dashboard"}/>;
    if(checkAuthorization(dispatch)) return <Redirect to={"/dashboard"}/>;

    console.log("Load login");
    return <Route path={"/login"} component={Login}/>;
  }
}

export function checkWidgetAuthorization({dispatch, getState}){
  return ()=>{
    const client = getState().client;

    if ( client && client.token) {
      console.log("dispatch 1");
      console.log(client);
      return <Route path={"/dashboard"} component={Dashboard}/>;
    }

    if(checkAuthorization(dispatch)) {
      console.log("dispatch 2");
      return <Route path={"/dashboard"} component={Dashboard}/>;
    }

    return <Redirect to={"/login"}/>;
  }
}

function checkAuthorization(dispatch){
  const storedToken = localStorage.getItem('token');

  if ( storedToken ) {
    const token = JSON.parse(storedToken);
    return true;
  }
  return false;
}