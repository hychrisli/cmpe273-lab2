import React from 'react';
import {TextField, ReferenceField} from 'admin-on-rest';
import {List, Datagrid} from 'admin-on-rest';

export const MatchProjList = (props) => (
  <List title="Match" {...props}>
    <Datagrid>
      <ReferenceField label={"Project"} source="id" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <TextField source={'skills'}/>
    </Datagrid>
  </List>
);
