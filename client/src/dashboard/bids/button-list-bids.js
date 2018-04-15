import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class ListBidsButton extends Component{

  static propTypes = {
    push: PropTypes.func,
  };

  handleClick =  () => {
    this.props.push('/bids?filter={"projectId"%3A"'+ this.props.record.id+'"}');
  };

  render() {
    return <FlatButton label={"List Bids"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  push: pushAction
})(ListBidsButton);
