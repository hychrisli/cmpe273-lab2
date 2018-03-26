import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';

class FileUpload extends Component{

  constructor(props) {
    super(props);
    this.state ={
      file: null
    };

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  static propTypes = {
    goBack: PropTypes.func,
    showNotification: PropTypes.func,
    project: PropTypes.object,
  };

  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  submit = (e) => {
    e.preventDefault();
    const {goBack, showNotification, project} = this.props;
    const formData = new FormData();
    console.log(this.props);

    formData.append('project_id',project.id);
    formData.append('owner_id', project.employer_id);
    formData.append('file', this.state.file);
    const url = `${process.env.REACT_APP_API_URL}/proj-files/`;
    console.log(url);
    fetch(url, {
      method:'POST',
      body: formData
    })
      .then(() => {
        showNotification('Uploaded');
        goBack();
      })
      .catch((e) => {
        console.error(e);
        showNotification('Failed to Upload');
      })
    };

  render() {
    return(
      <form className="widget-form" onSubmit={this.submit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    )
  }
}

const connected = connect(null, {
  showNotification: showNotificationAction,
  goBack: goBack
})(FileUpload);

export default connected;