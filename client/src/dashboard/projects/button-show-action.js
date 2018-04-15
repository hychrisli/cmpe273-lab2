import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PayButton from './button-pay';
import UploadButton from '../proj-files/button-upload';
import BidButton from './button-bid';
import FlatButton from 'material-ui/FlatButton';

class ShowActionButton extends Component{

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
    const isWorking = record.status === 1;
    const isBidding = record.status === 0;

    return (
      <div>
        { isEmployer && isWorking && (<PayButton {...this.props}/>)}
        { !isEmployer && isWorking && (<UploadButton {...this.props}/>)}
        { !isEmployer && isBidding && (<BidButton {...this.props}/>)}
        { !isEmployer && !isWorking && !isBidding && (<FlatButton disabled={true}/>)}
        { isEmployer && !isWorking && (<FlatButton disabled={true}/>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps)(ShowActionButton);
