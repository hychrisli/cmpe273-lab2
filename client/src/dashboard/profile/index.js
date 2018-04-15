import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { showNotification as showNotificationAction } from 'admin-on-rest';
import AddSkillButton from '../user-skills/button-add-skill';

import Messages from '../../notifications/messages'
import Errors from '../../notifications/errors'

import {profileUpdate} from "./actions";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      file: null,
      url: null,
      update:false,
    };
    this.onChange = this.onChange.bind(this);
    this.submitImg = this.submitImg.bind(this);
  }

  static propTypes = {
    handleSubmit: PropTypes.func,
    profileUpdate: PropTypes.func,
    showNotification: PropTypes.func,
    profile: PropTypes.shape({
      updating: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
    client: PropTypes.shape({
      id: PropTypes.string,
      token: PropTypes.shape({
        email: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        aboutMe: PropTypes.string
      })
    })
  };

  submit = (values) => {
    values['username'] = this.state.username;
    console.log(values);
    this.props.profileUpdate(values);

  };

  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  submitImg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const{showNotification} = this.props;

    if (this.state.file === null){
      showNotification('Choose An Image!');
      return;
    }

    formData.append('file', this.state.file);
    const url = `${process.env.REACT_APP_API_URL}/images/` + this.state.username;
    console.log(url);
    fetch(url, {
      method:'POST',
      body: formData
    })
      .then(() => {
        showNotification('Image Uploaded');
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
        showNotification('Failed to Upload');
      })
  };

  componentDidMount() {
    const {
      client: {
        token: {
          username,
          email,
          firstName,
          lastName,
          aboutMe
        }
      }
    } = this.props;

    this.props.initialize({
      email,
      firstName,
      lastName,
      aboutMe
    });

    this.setState({username,
      url: `${process.env.REACT_APP_API_URL}/images/` + username})
  }

  render() {
    const {
      handleSubmit,
      profile: {
        updating,
        successful,
        messages,
        errors,
      },
    } = this.props;

    return (
      <div className={"profile"}>
        <form className={'widget-form'} onSubmit={this.submitImg}>
          <img name={"my profile image"} src={`${this.state.url}`} height="200" width="200" />
          <br/>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Update Profile</button>
        </form>
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Profile</h1>
          <label>Username: {this.state.username}</label>

          <label>Password</label>
          <Field
            name={"password"}
            type={"text"}
            component={"input"}
            label={"password"}
          />
          <label>Email</label>
          <Field
            name={"email"}
            type={"text"}
            component={"input"}
            label={"Email"}
          />
          <label>First Name</label>
          <Field
            name={"firstName"}
            type={"text"}
            component={"input"}
            label={"FirstName"}
          />
          <label>Last Name</label>
          <Field
            name={"lastName"}
            type={"text"}
            component={"input"}
            label={"LastName"}
          />
          <label>About Me</label>
          <Field
            name={"aboutMe"}
            type={"text"}
            component={"input"}
            label={"AboutMe"}
          />
          <button type="submit">Update</button>
        </form>
        <AddSkillButton/>
        <div className={"auth-messages"}>
          {!updating && !!errors && (
            <Errors message={"Failed to update profile due to: "} errors={errors}/>
          )}
          {!updating && !!messages.length && (<Messages messages={messages}/>)}
          {!updating && successful && (<div>Profile update successful </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  client: state.client,
  enableReinitialize: true
});


const connected = connect(mapStateToProps, {
  profileUpdate,
  showNotification: showNotificationAction
})(Profile);

const formed = reduxForm({
  form: 'profile',
})(connected);

export default formed;

