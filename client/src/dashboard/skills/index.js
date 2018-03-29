import React from 'react';
import {TextField} from 'admin-on-rest';
import {TextInput} from 'admin-on-rest';
import {List, Create, SimpleForm, Datagrid} from 'admin-on-rest';

export const SkillList = (props) => (
  <List title="Skills" {...props}>
    <Datagrid>
      <TextField source="id"/>
      <TextField source={"skillName"}/>
    </Datagrid>
  </List>
);

export const SkillCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="skillName"/>
    </SimpleForm>
  </Create>
);
