import React from 'react';
import {TextField, ReferenceField} from 'admin-on-rest';
import {TextInput} from 'admin-on-rest';
import {List, Datagrid, Filter} from 'admin-on-rest';
import {SimpleForm, Create, Show, SelectArrayInput} from 'admin-on-rest';

export const MatchProjList = (props) => (
  <List title="Skills" {...props}>
    <Datagrid>
      <ReferenceField label={"Project"} source="id" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <TextField source={'skills'}/>
    </Datagrid>
  </List>
);
