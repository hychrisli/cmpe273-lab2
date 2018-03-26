import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import FlatButton from 'material-ui/FlatButton';

class DelButton extends Component{

  static propTypes = {
    showNotification: PropTypes.func,
    record: PropTypes.object,
  };

  handleClick =  () => {

    const{record, showNotification} = this.props;
    console.log(record);
    const url = `${process.env.REACT_APP_API_URL}/proj-files/`+record.id;
    fetch(url, {
      method:'DELETE'
    })
      .then(() => {
        showNotification('File Deleted');
      })
      .catch((e) => {
        console.error(e);
        showNotification('Failed to delete file');
      })

  };

  render() {
    const {record,client:{token}} = this.props;
    return <FlatButton label={"Delete"} onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  showNotification: showNotificationAction,
})(DelButton);
