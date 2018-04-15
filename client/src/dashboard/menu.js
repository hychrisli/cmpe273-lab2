import React from 'react';
import { connect } from 'react-redux';
import {DashboardMenuItem, MenuItemLink, getResources } from 'admin-on-rest';
import {Divider} from 'material-ui'
import {Card, CardText, CardHeader} from 'material-ui/Card';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
};

const Menu = ({onMenuTap, translate, logout, client}) => (
  <div style={styles.main}>
    <p>Hello! {client.token.username}</p>
    <DashboardMenuItem onClick={onMenuTap} />
    <MenuItemLink
      to={"/projects?filter={}"}
      primaryText={"Projects"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={"/match"}
      primaryText={"match"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={"/bids?filter={}"}
      primaryText={"Bids"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={"/skills?filter={}"}
      primaryText={"All Skills"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={"/users?filter={}"}
      primaryText={"Users"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={"/proj-files?filter={}"}
      primaryText={"Files"}
      onClick={onMenuTap}/>
    <Divider/>
    <br/>
    <Card>
      <CardHeader
        title="Mine"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <MenuItemLink
          to={"/profile"}
          primaryText={"Profile"}
          onClick={onMenuTap}/>
        <MenuItemLink
          to={'/user-skills?filter={"userId"%3A"'+ client.token.id +'"}'}
          primaryText={"My Skills"}
          onClick={onMenuTap}/>
        <MenuItemLink
          to={'/projects?filter={"employerId"%3A"'+ client.token.id +'"}'}
          primaryText={"My Projects"}
          onClick={onMenuTap}/>
        <MenuItemLink
          to={'/bids?filter={"userId"%3A"'+ client.token.id +'"}'}
          primaryText={"My Bids"}
          onClick={onMenuTap}/>
      </CardText>
    </Card>
    <Divider/>
    <Card>
      <CardHeader
        title="Transation Manager"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <MenuItemLink
          to={'/balance'}
          primaryText={"My Balance"}
          onClick={onMenuTap}/>
        <MenuItemLink
          to={'/payment?filter={"isPayer"%3Afalse}'}
          primaryText={"My Income"}
          onClick={onMenuTap}/>
        <MenuItemLink
          to={'/payment?filter={"isPayer"%3Atrue}'}
          primaryText={"My Expense"}
          onClick={onMenuTap}/>
      </CardText>
    </Card>
    {logout}
  </div>
);

const mapStateToProps = state => ({
  resources: getResources(state),
  client: state.client,
});
export default connect(mapStateToProps)(Menu);

