import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import {setProject} from "../projects/actions";
import {setSkillChoices} from './actions';

class AddSkillButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    setProject: PropTypes.func,
    setSkillChoices: PropTypes.func
  };

  componentDidMount(){
    const url = `${process.env.REACT_APP_API_URL}/skills/`;
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json=>{
        this.props.setSkillChoices(json)
      })
      .catch( e => {
        console.error(e);
      })
  }

  handleClick =  () => {
    console.log(this.props.record);
    this.props.setProject(this.props.record);
    this.props.push('/proj-skills/create');
  };

  render() {
    return <FlatButton label={"Add Skill"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  push: pushAction,setProject, setSkillChoices
})(AddSkillButton);
