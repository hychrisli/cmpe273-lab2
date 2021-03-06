import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import FlatButton from 'material-ui/FlatButton';

class DelButton extends Component{

  constructor(props){
    super(props);
    this.state = {
      isChosen: false,
    }
  }


  static propTypes = {
    push: PropTypes.func,
    showNotification: PropTypes.func,
    record: PropTypes.object,
    client: PropTypes.object,
  };


  componentDidMount(){
    const{record} = this.props;
    const url = `${process.env.REACT_APP_API_URL}/projects/` + record.projectId;
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json=>{
        if ( json.chosenBid === record.id)
          this.setState({isChosen:true})
      })
      .catch( e => {
        console.error(e);
      })
  }

  handleClick =  () => {
    const{push, record, showNotification} = this.props;

    if (this.state.isChosen){
      showNotification('Cannot Delete Chosen Bid')
    } else {

      const storedToken = localStorage.getItem('token');
      if ( storedToken ) {
        const token = JSON.parse(storedToken);

        const url = `${process.env.REACT_APP_API_URL}/bids/` + record.id;
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
        })
          .then(() => {
            showNotification('Bid Deleted');
            window.location.reload();
            // push('/projects');
          })
          .catch((e) => {
            console.error(e);
            showNotification('Failed to delete');
          })
      }
    }
  };

  render() {
    const {
      record,
      client:{
        token
      }
    } = this.props;

    const isDisabled = !(record.isActive === true && token.id === record.userId);
    return <FlatButton label={"Delete"} disabled={ isDisabled } onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  showNotification: showNotificationAction,
  push: pushAction
})(DelButton);
