import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditButton from './button-edit';
import BidButton from './button-bid';

class ActionButton extends Component{

  static propTypes = {
    record: PropTypes.object,
    client: PropTypes.object,
  };

  render() {
    const {
      record,
      client:{
        token
      }
    } = this.props;

    const isEmployer = token.id === record.employerId;

    return (
      <div>
        { isEmployer && (<EditButton {...this.props}/>)}
        { !isEmployer && (<BidButton {...this.props}/>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps)(ActionButton);
