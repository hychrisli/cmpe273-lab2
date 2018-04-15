import React from 'react';
import {TextField, ReferenceField, ShowButton, BooleanField, NumberField} from 'admin-on-rest';
import {List, Datagrid, Show, SimpleShowLayout, Filter, TextInput} from 'admin-on-rest';
import ActionButton from './button-action'

const BidFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Bidder ID"} source={"userId"}/>
    <TextInput label={"Project ID"} source={"projectId"}/>
  </Filter>
);

export const BidList = (props) => (
  <List title="Bids" {...props} filters={<BidFilter/>}>
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="projectId" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <ReferenceField label={"Bidder"} source="userId" reference={"users"} linkType="show">
        <TextField source={"username"}/>
      </ReferenceField>
      <BooleanField source={"isActive"}/>
      <NumberField source={"bidPrice"}/>
      <NumberField source={"bidDays"}/>
      <ActionButton {...props}/>
    </Datagrid>
  </List>
);

const BidTitle = ({record}) => {
  return <span>Bid {record ? `by ${record.username}` : ''}</span>;
};

export const BidShow = (props) => (
  <Show {...props} title={<BidTitle/>} >
    <SimpleShowLayout>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="projectId" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <ReferenceField label={"Bidder"} source="userId" reference={"users"} linkType="show">
        <TextField source={"username"}/>
      </ReferenceField>
      <TextField source={"bidPrice"}/>
      <TextField source={"bidDays"}/>
    </SimpleShowLayout>
  </Show>
);
