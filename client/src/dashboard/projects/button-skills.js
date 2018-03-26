import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class SkillsButton extends Component{

  static propTypes = {
    push: PropTypes.func,
  };

  handleClick =  () => {
    console.log(this.props.record);
    this.props.push('/proj-skills?filter={"project_id"%3A"'+ this.props.record.id +'"}&order=DESC&page=1&perPage=10&sort=id');
  };

  render() {
    return <FlatButton label={"Skills"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  push: pushAction,
})(SkillsButton);
