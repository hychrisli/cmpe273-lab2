import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import {setProject} from "../projects/actions";
import {setSkillChoices} from '../proj-skills/actions';

class ListFilesButton extends Component{

  static propTypes = {
    push: PropTypes.func,
  };

  handleClick =  () => {
    this.props.push('/proj-files?filter={"projectId"%3A"'+ this.props.record.id+'"}');
  };

  render() {
    return <FlatButton label={"List Files"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  push: pushAction,setProject, setSkillChoices
})(ListFilesButton);
