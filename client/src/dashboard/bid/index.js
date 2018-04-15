import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Messages from '../../notifications/messages'
import Errors from '../../notifications/errors'
import {bidProject} from './actions'
import {goBack} from "react-router-redux";
import { push as pushAction } from 'react-router-redux';
import {minValue, maxValue, renderField} from '../lib/validate'


class BidCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasBid: false,
      bid: {}
    };

    this.minPrice = this.minPrice.bind(this);
    this.maxPrice = this.maxPrice.bind(this);
  }

  static propTypes = {
    handleSubmit: PropTypes.func,
    bidProject: PropTypes.func,
    client: PropTypes.shape({
      token: PropTypes.object
    }),
    project: PropTypes.object
  };

  minPrice(val){
    return minValue(this.props.project.minBudget)(val);
  }

  maxPrice(val) {
    return maxValue(this.props.project.maxBudget)(val);
  }

  componentWillMount(){

    const {
      client:
        {
          token
        },
      project
    } = this.props;

    const storedToken = localStorage.getItem('token');

    if ( storedToken ) {
      const jwt = JSON.parse(storedToken);
      const url = `${process.env.REACT_APP_API_URL}/bids?userId=${token.id}&projectId=${project.id}`;
      fetch(url, {
        method: 'GET',
        headers: new Headers({'Authorization': jwt}),
      })
        .then(response => response.json())
        .then(json => {
          if ( json.length > 0 )
            this.setState({hasBid: true, bid: json[0]});
        })
        .catch(e => {
          console.error(e);
        });
    }
  }


  componentDidMount(){
    const {
      client,
      project
    } = this.props;

    this.props.initialize({
      userId: client.token.id,
      projectId: project.id,
      employerId: project.employerId
    });


  }

  submit =(values) => {
    this.props.bidProject(values);
  };

  goBack = () => {
    this.props.goBack();
  };

  goToProjects =()=> {
    this.props.push('/projects')
  };

  render() {
    const {
      handleSubmit,
      submitting,
      project: {title, maxBudget, minBudget},
      bid: {
        bidding,
        messages,
        errors
      },
    } = this.props;

    const noProject = this.props.project.id === undefined;

    return (
      <div>
        {!noProject && !this.state.hasBid && (
          <div className={"bid"}>
            <form className="widget-form"  onSubmit={handleSubmit(this.submit)}>
              <h1>Bidding</h1>
              <h3>Project: {title} </h3>
              <Field
                name={"projectId"}
                type={"text"}
                component={"input"}
                label={"Project ID"}
                disabled={true}
              />
              <Field
                name={"bidPrice"}
                type={"number"}
                component={renderField}
                label={"Bid Price: $" + minBudget + " ~ $" + maxBudget}
                validate={[this.minPrice, this.maxPrice]}
              />
              <Field
                name={"bidDays"}
                type={"number"}
                component={renderField}
                label={"Bid Days"}
              />
              <button type="submit" disabled={submitting}>Bid</button>
              <button type="reset" onClick={this.goBack}>Go Back</button>
            </form>
            <div className={"auth-messages"}>
              {!bidding && !!errors.length && (
                <Errors message={"Failure to bid due to: "} errors={errors}/>
              )}
              {!bidding && !!messages.length && (
                <Messages messages={messages}/>
              )}
              {bidding && <div> Bidding...</div>}
            </div>
          </div>
        )}
        {!noProject && this.state.hasBid && (
          <form className="widget-form">
            <h3> A bid has already placed </h3>
            <p> Bid Price: ${this.state.bid.bidPrice}</p>
            <p> Bid Days : {this.state.bid.bidDays}</p>
            <button type="reset" onClick={this.goBack}>Go Back</button>
          </form>
        )}
        { noProject && (
          <form className="widget-form">
            <h3> No Project Information </h3>
            <button type="reset" onClick={this.goToProjects}>Go To Projects</button>
          </form>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  project: state.project,
  client: state.client,
  bid: state.bid,
  enableReinitialize: true
});

const connected = connect(mapStateToProps, {
  goBack: goBack,
  push: pushAction,
  bidProject,
})(BidCreate);

const formed = reduxForm({
  form: 'bid',
})(connected);

export default formed;