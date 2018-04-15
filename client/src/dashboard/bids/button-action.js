import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import HireButton from './button-hire';
import DeleteButton from './button-delete';

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
    const isBidder = token.id === record.userId;

    return (
      <div>
        { isEmployer && (<HireButton {...this.props}/>)}
        { isBidder && (<DeleteButton {...this.props}/>)}
        { !isEmployer && !isBidder && (<FlatButton/>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps)(ActionButton);
