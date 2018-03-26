import React from 'react';
import {List, Datagrid, TextField, ImageField} from 'admin-on-rest';
import {Show, SimpleShowLayout, ShowButton} from 'admin-on-rest';


export const UserList = (props) => (
  <List title="Users" {...props}>
    <Datagrid>
      <TextField source={"id"}/>
      <TextField source="username"/>
      <ImageField source="image_url"/>
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
      <ImageField source="image_url"/>
      <TextField source={"first_name"}/>
      <TextField source={"last_name"}/>
      <TextField source={"about_me"}/>
    </SimpleShowLayout>
  </Show>
);