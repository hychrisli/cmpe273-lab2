import React from 'react';
import {TextField, ReferenceField} from 'admin-on-rest';
import {TextInput} from 'admin-on-rest';
import {List, Datagrid, Filter} from 'admin-on-rest';
import {SimpleForm, Create, Show, SelectArrayInput} from 'admin-on-rest';
import {connect} from "react-redux";
import NotAuthorized from '../lib/not-authorized'

const ProjFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Project Id"} source={"project_id"}/>
  </Filter>
);

export const ProjSkillList = (props) => (
  <List title="Skills" {...props} filters={<ProjFilter/>}>
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="project_id" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <ReferenceField label={"Skill"} source="skill_id" reference={"skills"} linkType="show">
        <TextField source={"skill_name"}/>
      </ReferenceField>
    </Datagrid>
  </List>
);


const ProjSkillCreate = (props) => {
  const {
    project,
    client:{token:{username}},
    skillChoices
  } = props;

  if ( project.id === undefined )
    return (
      <NotAuthorized/>
    );

  else {
    return (
    <Create {...props} title={"Add Skill for" + project.title}>
      <SimpleForm redirect={"/projects/" + project.id} submitOnEnter={false}>
        <TextInput source="project_id" defaultValue={project.id}/>
        <SelectArrayInput source="skill_id" choices={skillChoices} optionText="skill_name" optionValue="id" />
      </SimpleForm>
    </Create> )
  }
};

const mapStateToProps = (state) => ({
  project: state.project,
  client: state.client,
  skillChoices: state.skillChoices,
});

export const MyProjSkillCreate = connect(mapStateToProps)(ProjSkillCreate);
