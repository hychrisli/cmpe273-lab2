import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';

class AddMoney extends Component{

  constructor(props) {
    super(props);
    this.state ={
      amount: 0
    };

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  static propTypes = {
    goBack: PropTypes.func,
    showNotification: PropTypes.func,
  };

  onChange(e) {
    console.log(e.target.value);
    this.setState({amount: e.target.value})
  }

  submit = (e) => {
    e.preventDefault();
    const {goBack, showNotification} = this.props;
    const formData = new FormData();
    formData.append('amount', this.state.amount.toString());
    const storedToken = localStorage.getItem('token');
    if ( storedToken ) {
      const token = JSON.parse(storedToken);
      const url = `${process.env.REACT_APP_API_URL}/balance/`;
      fetch(url, {
        method: 'PUT',
        headers: new Headers({'Authorization': token}),
        body: formData
      })
        .then(() => {
          showNotification('Balance Updated');
          goBack();
        })
        .catch((e) => {
          console.error(e);
          showNotification('Failed');
        })
    }
  };

  render() {
    return(
      <form className="widget-form" onSubmit={this.submit}>
        <h1>Add Money</h1>
        <input type={"number"} name={"amount"} onChange={this.onChange}/>
        <button type="submit">Add</button>
      </form>
    )
  }
}

const connected = connect(null, {
  showNotification: showNotificationAction,
  goBack: goBack
})(AddMoney);

export default connected;