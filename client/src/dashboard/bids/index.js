import React from 'react';
import {TextField, ReferenceField, ShowButton, BooleanField} from 'admin-on-rest';
import {List, Datagrid, Show, SimpleShowLayout, Filter, TextInput} from 'admin-on-rest';
import DelButton from './button-delete'
import HireButton from './button-hire'

const BidFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Bidder ID"} source={"user_id"}/>
  </Filter>
);

export const BidList = (props) => (
  <List title="Bids" {...props} filters={<BidFilter/>}>
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="project_id" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <ReferenceField label={"Bidder"} source="user_id" reference={"users"} linkType="show">
        <TextField source={"username"}/>
      </ReferenceField>
      <TextField source={"is_active"}/>
      <TextField source={"bid_price"}/>
      <TextField source={"bid_days"}/>
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
      <ReferenceField label={"Project"} source="project_id" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <TextField label={"Bidder"} source={"username"}/>
      <TextField source={"bid_price"}/>
      <TextField source={"bid_days"}/>
    </SimpleShowLayout>
  </Show>
);
