import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import {setProject} from "./actions";

class PayButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    setProject: PropTypes.func,
    record: PropTypes.object,
    client: PropTypes.object,
  };

  handleClick =  () => {
    this.props.setProject(this.props.record);
    this.props.push("/pay");
  };

  render() {
    const {record} = this.props;
    return <FlatButton {...this.props} label={"Pay"} disabled={record.status !== 1} onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  push: pushAction, setProject
})(PayButton);
