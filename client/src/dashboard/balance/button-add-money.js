import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import {setProject} from "../projects/actions";

class AddMoneyButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    setProject: PropTypes.func,
  };

  handleClick =  () => {
    this.props.push('/balance/add');
  };

  render() {
    return <FlatButton label={"Add Money"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  push: pushAction,setProject
})(AddMoneyButton);