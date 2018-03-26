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
    const url = `${process.env.REACT_APP_API_URL}/hire/` + record.project_id;
    fetch(url, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'chosen_bid': record.id})
    })
      .then(() => {
        showNotification('Hired!');
        push('/projects/' + record.project_id + '/show');
      })
      .catch((e) => {
        console.error(e);
        showNotification('Failed to Hire');
      })

  };

  render() {
    const {
      record,
      client:{
        token
      }
    } = this.props;

    const isDisabled = !(record.is_active === 'true' && token.id === record.employer_id);
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
