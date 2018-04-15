import React from 'react';
import {List, Datagrid, TextField, ShowButton, ReferenceField} from 'admin-on-rest';
import {Edit, SimpleForm, TextInput, NumberInput, SelectInput} from 'admin-on-rest';
import {Filter, Create, DateInput, Show, SimpleShowLayout, DateField} from 'admin-on-rest';
import {ListButton, RefreshButton } from 'admin-on-rest';
import { CardActions } from 'material-ui/Card';

import BidButton from './button-bid'
import EditButton from './button-edit'
import ListActionButton from './buttion-list-action';
import AddSkillButton from '../proj-skills/button-add-skill';
import UploadButton from '../proj-files/button-upload';
import ListFilesButton from '../proj-files/button-list-files'
import ListBidsButton from '../bids/button-list-bids';
import { connect } from 'react-redux';
import {detailStyle,buttonStyle, dividerStyle, MyDivider} from '../lib/style'
// List

const ProjFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Employer ID"} source={"employerId"}/>
    <TextInput label={"Project Title"} source={"title"}/>
    <TextInput label={"Skill"} source={"skill"}/>
    <SelectInput source="status" choices={[
      { id: 0, name: 'Bidding' },
      { id: 1, name: 'Working' },
      { id: 2, name: 'Closed' },
    ]} alwaysOn/>
  </Filter>
);

export const ProjList = (props) => (
  <List title="Projects" {...props} filters={<ProjFilter/>}>
    <Datagrid>
      <TextField source="title"/>
      <TextField source="description"/>
      <ReferenceField label={"Employer"} source="employerId" reference={"users"} linkType="show">
        <TextField source={"username"}/>
      </ReferenceField>
      <TextField source="skills"/>
      <TextField source="bidNum" label={"# of Bids"}/>
      <TextField source="range" label={"Budget($)"}/>
      <ShowButton/>
      <ListActionButton/>
    </Datagrid>
  </List>
);

// Edit

const ProjTitle = ({record}) => {
  return <span>Project {record ? `"${record.title}"` : ''}</span>;
};

const ProjEditActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    <ShowButton basePath={basePath} record={data}/>
    <ListButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

export const ProjEdit = (props) => (
  <Edit title={<ProjTitle/>}  actions={<ProjEditActions/>}  {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <TextInput source="description"/>
      <NumberInput source="minBudget" label={"Min Budget"}/>
      <NumberInput source="maxBudget" label={"Max Budget"}/>
      <DateInput source="startDate" label={"Start Date"}/>
      <MyDivider style={dividerStyle}/>
      <TextField label={"skills"} source={"skills"} style={detailStyle}/>
      <AddSkillButton style={buttonStyle}/>
      <MyDivider style={dividerStyle}/>
      <UploadButton style={buttonStyle}/>
      <ListFilesButton style={buttonStyle}/>
    </SimpleForm>
  </Edit>
);

const ProjCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <TextInput source="description"/>
      <TextInput source="employer" defaultValue={props.client.token.username}/>
      <NumberInput source="minBudget"/>
      <NumberInput source="maxBudget"/>
      <DateInput source="startDate"/>
    </SimpleForm>
  </Create>
);


const mapStateToProps = (state) => ({
  client: state.client,
});

export const MyProjCreate = connect(mapStateToProps)(ProjCreate);

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};


const ProjShowActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

export const ProjShow = (props) => {
  return (
  <Show {...props} actions={<ProjShowActions/>} title={<ProjTitle/>} >
    <SimpleShowLayout>
      <TextField source={"title"} style={detailStyle}/>
      <ReferenceField label={"Employer"} source="employerId" reference={"users"} linkType="show" style={detailStyle}>
        <TextField source={"username"}/>
      </ReferenceField>
      <TextField source={"minBudget"} style={detailStyle}/>
      <TextField source={"maxBudget"} style={detailStyle}/>
      <DateField source={"startDate"} style={detailStyle}/>
      <MyDivider />
      <TextField source={"description"} style={detailStyle}/>
      <MyDivider />
      <TextField source={"chosenBid"} style={detailStyle}/>
      <TextField source={"bidNum"}  label={"# of Bids"} style={detailStyle}/>
      <TextField source={"avgPrice"}  label={"Avg. Bid Price"} style={detailStyle}/>
      <TextField source={"skills"} style={detailStyle}/>
      <MyDivider />
      <ListBidsButton {...props} style={buttonStyle}/>
      <ListFilesButton {...props} style={buttonStyle}/>
      <BidButton {...props} style={buttonStyle}/>
    </SimpleShowLayout>
  </Show>
)};