import React, {Component} from 'react'
import PropTypes from "prop-types";

import {unsetClient} from '../../client/actions'
import {connect} from "react-redux";
import {reduxForm} from "redux-form";

class Logout extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  submit = () => {
    this.props.unsetClient();
  };

  render() {
    return (
      <button className={"logout"} type="submit" onClick={this.submit}>Log Out</button>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client
});


const connected = connect(mapStateToProps, {unsetClient})(Logout);

const formed = reduxForm({
  form: 'logout'
})(connected);


export default formed;