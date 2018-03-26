import React from 'react';
import {TextField} from 'admin-on-rest';
import {TextInput} from 'admin-on-rest';
import {List, Create, SimpleForm, Datagrid} from 'admin-on-rest';

export const SkillList = (props) => (
  <List title="Skills" {...props}>
    <Datagrid>
      <TextField source="id"/>
      <TextField source={"skill_name"}/>
    </Datagrid>
  </List>
);

export const SkillCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="skill_name"/>
    </SimpleForm>
  </Create>
);
