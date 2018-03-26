import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';

class DownloadButton extends Component{

  static propTypes = {
    showNotification: PropTypes.func,
  };

  handleClick =  () => {
    console.log(this.props.record);
    const url = `${process.env.REACT_APP_API_URL}/proj-files/` + this.props.record.id;
    setTimeout(() => {
      const response = {
        file: url,
      };
      window.open(response.file);
    }, 100);

  };

  render() {
    return <FlatButton label={"Download"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  showNotification: showNotificationAction,
})(DownloadButton);
