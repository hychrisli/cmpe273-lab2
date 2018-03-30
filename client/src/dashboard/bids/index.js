import React from 'react';
import {TextField, ReferenceField, ShowButton, BooleanField} from 'admin-on-rest';
import {List, Datagrid, Show, SimpleShowLayout, Filter, TextInput} from 'admin-on-rest';
import DelButton from './button-delete'
import HireButton from './button-hire'

const BidFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Bidder ID"} source={"userId"}/>
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
      <TextField source={"isActive"}/>
      <TextField source={"bidPrice"}/>
      <TextField source={"bidDays"}/>
      <ShowButton/>
      <HireButton/>
      <DelButton/>
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
