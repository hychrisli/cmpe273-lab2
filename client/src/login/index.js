import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Messages from '../notifications/messages'
import Errors from '../notifications/errors'

import loginRequest from './actions'

class Login extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    })
  };

  submit = (values) => {
    this.props.loginRequest(values)
  };

  render() {
    const {
      handleSubmit,
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props;

    return (
      <div className={"login"}>
        <form className={"widget-form"} onSubmit={handleSubmit(this.submit)}>
          <h1>Login</h1>
          <label htmlFor={"username"}>Username</label>
          <Field
            name={"username"}
            type={"text"}
            id={"username"}
            className={"username"}
            label={"Username"}
            component={"input"}/>
          <label htmlFor={"password"}>Password</label>
          <Field
            name={"password"}
            type={"password"}
            id={"password"}
            className={"password"}
            label={"Password"}
            component={"input"}/>
          <button type="submit">LOGIN</button>
        </form>
        <div className={"auth-messages"}>
          {!requesting && !!errors.length && (
            <Errors message={"Failure to login due to: "} errors={errors}/>
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages}/>
          )}
          {requesting && <div> Logging in...</div>}
          {!requesting && !successful && (
            <Link to="/signup">Need to Signup? Click Here>></Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const connected = connect(mapStateToProps, {loginRequest})(Login);

const formed = reduxForm({
  form: 'login'
})(connected);


export default formed;