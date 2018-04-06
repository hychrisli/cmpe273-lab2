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

class Dashboard extends Component {

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
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    options.headers.set('Authorization', this.props.client.token.jwt);
    return fetchUtils.fetchJson(url, options);
  };
  restClient = jsonServerRestClient(`${process.env.REACT_APP_API_URL}`, this.httpClient);


  render() {

    console.log("Admin initial State");
    console.log(this.props.client);

    return (
      <div>
        <Logout/>
        <Admin // authClient={authClient}
          customReducers={{profile, client, project, bid, skillChoices}}
          customSagas={[IndexSaga]}
          menu={Menu}
          initialState={{'client': this.props.client}}
          title={"Freelancer"}
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
    );
  }
}

const mapStateToProps = state =>({
  client: state.client
});

const connected = connect(mapStateToProps)(Dashboard);

export default connected;