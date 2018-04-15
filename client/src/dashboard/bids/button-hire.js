import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import FlatButton from 'material-ui/FlatButton';

class HireButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    showNotification: PropTypes.func,
    record: PropTypes.object,
    client: PropTypes.object,
  };


  handleClick =  () => {

    const{push, record, showNotification} = this.props;


    const storedToken = localStorage.getItem('token');
    if ( storedToken ) {
      const token = JSON.parse(storedToken);
      const url = `${process.env.REACT_APP_API_URL}/hire/` + record.projectId;

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({'chosenBid': record.id})
      })
        .then(() => {
          showNotification('Hired!');
          push('/projects/' + record.projectId + '/show');
        })
        .catch((e) => {
          console.error(e);
          showNotification('Failed to Hire');
        })
    }

  };

  render() {
    const {
      record,
      client:{
        token
      }
    } = this.props;

    const isDisabled = !(record.isActive === true && token.id === record.employerId);
    return <FlatButton label={"Hire"} disabled={isDisabled} onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  showNotification: showNotificationAction,
  push: pushAction
})(HireButton);
