import React from 'react';
import {List, Datagrid, TextField, ImageField} from 'admin-on-rest';
import {Show, SimpleShowLayout, ShowButton} from 'admin-on-rest';


export const UserList = (props) => (
  <List title="Users" {...props}>
    <Datagrid>
      <TextField source={"id"}/>
      <TextField source="username"/>
      <ImageField source="imageUrl"/>
      <ShowButton/>
    </Datagrid>
  </List>
);

const UserTitle = ({record}) => {
  return <span>User: {record ? `"${record.username}"` : ''}</span>;
};

export const UserShow = (props) => (
  <Show {...props} title={<UserTitle/>} >
    <SimpleShowLayout>
      <ImageField source="imageUrl"/>
      <TextField source={"firstName"}/>
      <TextField source={"lastName"}/>
      <TextField source={"aboutMe"}/>
    </SimpleShowLayout>
  </Show>
);