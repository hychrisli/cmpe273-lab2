import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import Messages from '../notifications/messages'
import Errors from '../notifications/errors'

import {signupRequest} from './actions'

class Signup extends Component{

  static propTypes = {
    handleSubmit: PropTypes.func,
    signupRquest: PropTypes.func,
    signup: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    })
  };

  submit = (values) => {
    this.props.signupRequest(values)
  };

  render(){
    const {
      handleSubmit,
      signup: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props;

    return (
      <div className={"signup"}>
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Signup</h1>
          <label htmlFor={"email"}>Email</label>
          <Field
            name={"email"}
            type={"text"}
            id={"email"}
            className={"email"}
            label={"Email"}
            component={"input"}/>
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
            component={"input"}
          />
          <button type="submit">SIGNUP</button>
        </form>
        <div className={"auth-messages"}>
          {!requesting && !!errors.length && (
            <Errors message="Failure to signup due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {!requesting && successful && (
            <div>
              Signup Successful! <Link to="/login">Click here to Login »</Link>
            </div>
          )}
          {!requesting && !successful && (
            <Link to="/login">Already a User? Login Here »</Link>
          )}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  signup: state.signup,
});

const connected = connect(mapStateToProps, {signupRequest})(Signup);

const formed = reduxForm({
  form: 'signup',
})(connected);

export default formed;