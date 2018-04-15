import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import {setProject} from "../projects/actions";

class UploadButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    setProject: PropTypes.func,
  };

  handleClick =  () => {
    console.log(this.props.record);
    this.props.setProject(this.props.record);
    this.props.push('/proj-files/create');
  };

  render() {
    return <FlatButton label={"Upload File"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  push: pushAction,setProject
})(UploadButton);
