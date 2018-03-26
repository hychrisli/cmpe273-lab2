import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class ToMySkillsButton extends Component{

  static propTypes = {push: PropTypes.func};

  handleClick =  () => {
    this.props.push('/user-skills?filter={"username"%3A"'+ this.props.client.token.username +'"}');
  };

  render() {
    return <FlatButton label={"Back to My Skills"} onClick={this.handleClick}/>
  }
}

const mapStateToProps = (state) => ({
  client: state.client,
});


export default connect(mapStateToProps, {
  push: pushAction
})(ToMySkillsButton);
