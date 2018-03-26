import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class RedirectButton extends Component{

  static propTypes = {push: PropTypes.func};

  handleClick =  () => {
    this.props.push("/projects");
  };

  render() {
    return <FlatButton label={"Back to Projects"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  push: pushAction
})(RedirectButton);
