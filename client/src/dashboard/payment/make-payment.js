import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';

class MakePayment extends Component{

  constructor(props) {
    super(props);
    this.state ={
      isLoading: true,
      bid: {},
      jwt: JSON.parse(localStorage.getItem('token'))
    };

    this.submit = this.submit.bind(this);
  }

  static propTypes = {
    goBack: PropTypes.func,
    showNotification: PropTypes.func,
  };

  componentWillMount(){
    const {project} = this.props;
    if ( project.id !== undefined ) {
      const url = `${process.env.REACT_APP_API_URL}/bids/${project.chosenBid}`;
      fetch(url, {
        method: 'GET',
        headers: new Headers({'Authorization': this.state.jwt}),
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            isLoading: false,
            bid: json
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }

  submit = (e) => {

    e.preventDefault();
    const {goBack, showNotification, project} = this.props;
    const url = `${process.env.REACT_APP_API_URL}/payment/`;
    const formData = new FormData();
    formData.append('projectId',project.id);
    fetch(url, {
      method: 'POST',
      headers: new Headers({'Authorization': this.state.jwt}),
      body: formData
    })
      .then(() => {
        showNotification('Successfully Paid');
        goBack();
      })
      .catch((e) => {
        console.error(e);
        showNotification('Failed to Pay');
      })
  };

  goBack = () => {
    this.props.goBack();
  };


  render() {

    const {project} = this.props;

    const noProject = project.id === undefined;

    return(
      <div>
        { !this.state.isLoading && (
          <form className="widget-form"  onSubmit={this.submit}>
            <h1>Make a Payment </h1>
            <p> Project: {project.title} </p>
            <p> Bid ID: {project.chosenBid} </p>
            <p> Bidder(Payee): {this.state.bid.username}</p>
            <p> Amount: {this.state.bid.bidPrice} </p>
            <button type="submit">Pay</button>
          </form>
        )}
        { noProject && (
          <form className="widget-form">
            <h3> No Project Information </h3>
            <button type="reset" onClick={this.goBack}>Go To Projects</button>
          </form>
        )}
      </div>

    )
  }
}

const mapStateToProps = state => ({
  project: state.project,
  client: state.client,
});

const connected = connect(mapStateToProps, {
  showNotification: showNotificationAction,
  goBack: goBack
})(MakePayment);

export default connected;