import React, {Component} from 'react';
import {jsonServerRestClient, Admin, Resource, fetchUtils} from 'admin-on-rest';
import PropTypes from 'prop-types'

import customRoutes from './routes';
import IndexSaga from '../index-saga'
import Logout from './logout'

import profile from './profile/reducer'
import client from '../client/reducer'
import project from './projects/reducer'
import bid from './bid/reducer'
import skillChoices from './proj-skills/reducer'

import Menu from './menu';
import {ProjList, ProjEdit, ProjCreate, ProjShow} from './projects';
import {BidList, BidShow} from './bids';
import {SkillList, SkillCreate} from './skills';
import {ProjSkillList, MyProjSkillCreate} from './proj-skills'
import {ProjFileList, MyProjFileCreate} from './proj-files'
import {UserList, UserShow} from './users'
import {UserSkillList,MySkillCreate} from './user-skills'

import {connect} from "react-redux";
import {setClient} from "../client/actions";

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.string,
      token:  PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        aboutMe: PropTypes.string,
        image: PropTypes.string
      })

    })
  };

  httpClient = (url, options = {}) => {
    const storedToken = localStorage.getItem('token');
    const token = JSON.parse(storedToken);
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    options.headers.set('Authorization', token);
    return fetchUtils.fetchJson(url, options);
  };
  restClient = jsonServerRestClient(`${process.env.REACT_APP_API_URL}`, this.httpClient);


  componentWillMount(){
    const storedToken = localStorage.getItem('token');

    if ( storedToken ) {
      const token = JSON.parse(storedToken);
      const url = `${process.env.REACT_APP_API_URL}/session/`;
      fetch(url, {
        method: 'GET',
        headers: new Headers({'Authorization': token}),
      })
        .then(response => response.json())
        .then(json => {
          this.props.dispatch(setClient(json));
          this.setState({isLoading: false});
        })
        .catch(e => {
          console.error(e);
        });
    }
  }

  render() {

    console.log("Admin initial State");
    console.log(this.props.client);

    return (
      <div>
      {!this.state.isLoading &&(
        <div>
          <Logout/>
          <Admin// authClient={authClient}
            customReducers={{profile, client, project, bid, skillChoices}}
            customSagas={[IndexSaga]}
            menu={Menu}
            initialState={{'client': this.props.client}}
            title={"Freelancer:"}
            customRoutes={customRoutes}
            restClient={this.restClient}>
            <Resource name='projects'
                      list={ProjList}
                      show={ProjShow}
                      edit={ProjEdit}
                      create={ProjCreate}
            />
            <Resource name={'bids'}
                      list={BidList}
                      show={BidShow}
            />
            <Resource name={'skills'}
                      list={SkillList}
                      create={SkillCreate}
            />
            <Resource name={'proj-skills'}
                      list={ProjSkillList}
                      create={MyProjSkillCreate}
            />
            <Resource name={'proj-files'}
                      list={ProjFileList}
                      create={MyProjFileCreate}
            />
            <Resource name={'users'}
                      list={UserList}
                      show={UserShow}
            />
            <Resource name={'user-skills'}
                      list={UserSkillList}
                      create={MySkillCreate}
            />
            <Resource name={"profile"}/>
          </Admin>
        </div>

      )}
      </div>
    )
  }
}

const mapStateToProps = state =>({
  client: state.client
});

const connected = connect(mapStateToProps)(Dashboard);

export default connected;