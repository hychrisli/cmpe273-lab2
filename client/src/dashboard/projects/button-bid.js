import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import {setProject} from "./actions";

class BidButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    setProject: PropTypes.func,
    record: PropTypes.object,
    client: PropTypes.object,
  };

  handleClick =  () => {
    this.props.setProject(this.props.record);
    this.props.push("/bids/create");
  };

  render() {
    const {
      record,
      client:{
        token
      }
    } = this.props;
    return <FlatButton label={"Bid"} disabled={record.employerId === token.id} onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  push: pushAction,setProject
})(BidButton);
