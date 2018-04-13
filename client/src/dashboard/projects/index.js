import React from 'react';
import {List, Datagrid, TextField, ShowButton, ReferenceField, ReferenceArrayField} from 'admin-on-rest';
import {Edit, SimpleForm, TextInput, NumberInput, SingleFieldList} from 'admin-on-rest';
import {Filter, Create, DateInput, Show, SimpleShowLayout, DateField, ChipField} from 'admin-on-rest';
import {ListButton, RefreshButton } from 'admin-on-rest';
import { CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import BidButton from './button-bid'
import EditButton from './button-edit'
import SkillsButton from './button-skills'
import AddSkillButton from '../proj-skills/button-add-skill';
import UploadButton from '../proj-files/button-upload';
import ListFilesButton from '../proj-files/button-list-files'
import {getUsername} from '../lib/get-info'
// List

const ProjFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Employer ID"} source={"employerId"}/>
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
      <BidButton/>
      <EditButton/>
      <ShowButton/>
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
    <AddSkillButton record={data}/>
    <UploadButton record={data}/>
    <RefreshButton />
  </CardActions>
);

export const ProjEdit = (props) => (
  <Edit title={<ProjTitle/>}  actions={<ProjEditActions/>}  {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <TextInput source="description"/>
      <NumberInput source="min_budget"/>
      <NumberInput source="max_budget"/>
      <DateInput source="start_date"/>
      <ReferenceArrayField label={"skills"} reference={"skills"} source={"skills"}>
        <SingleFieldList>
          <ChipField source={"skillName"}/>
        </SingleFieldList>
      </ReferenceArrayField>
      <AddSkillButton/>
      <ReferenceArrayField label={"files"} reference={"proj-files"} source={"files"}>
        <SingleFieldList>
          <ChipField source={"fileName"}/>
        </SingleFieldList>
      </ReferenceArrayField>
      <UploadButton/>
    </SimpleForm>
  </Edit>
);

export const ProjCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <TextInput source="description"/>
      <TextInput source="employer" defaultValue={getUsername()}/>
      <NumberInput source="minBudget"/>
      <NumberInput source="maxBudget"/>
      <DateInput source="startDate"/>
    </SimpleForm>
  </Create>
);

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};


const ProjShowActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} />
    <RefreshButton />
    <SkillsButton record={data}/>
  </CardActions>
);

const detailStyle = { display: 'inline-block', verticalAlign: 'top', marginRight: '2em', minWidth: '8em', marginBottom: '2em' };
const MyDivider = ({source, record = {}}) => (<Divider />);


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
      <TextField source={"bids"}  label={"# of Bids"} style={detailStyle}/>
      <TextField source={"avgPrice"}  label={"Avg. Bid Price"} style={detailStyle}/>
      <MyDivider />
      <TextField source={"skills"} style={detailStyle}/>
      <ListFilesButton {...props}/>
    </SimpleShowLayout>
  </Show>
)};