import React from 'react';
import {TextField, ReferenceField, CardActions, CreateButton} from 'admin-on-rest';
import {TextInput, RefreshButton} from 'admin-on-rest';
import {List, Datagrid, Filter} from 'admin-on-rest';
import {SimpleForm, Create, Show, SelectArrayInput} from 'admin-on-rest';
import {connect} from "react-redux";
import BackToSkills from './back-to-profile'
import AddSkillButton from './button-add-skill';

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"User ID"} source={"userId"}/>
  </Filter>
);

export const UserSkillList = (props) => (
  <List title="My Skills" filters={<UserFilter/>} {...props} >
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Skill"} source="skillId" reference={"skills"} linkType="show">
        <TextField source={"skillName"}/>
      </ReferenceField>
    </Datagrid>
  </List>
);


const UserSkillCreate = (props) => {
  const {
    client:{token:{id, username}},
    skillChoices
  } = props;

  if ( skillChoices[0] === undefined){
    return (
      <BackToSkills/>
    );
  }
  else {
    return (
      <Create {...props} title={"Add Skill for " + username}>
        <SimpleForm redirect={'/user-skills?filter={"userId"%3A"'+id+'"}'} submitOnEnter={false}>
          <TextInput source="userId" defaultValue={id}/>
          <SelectArrayInput source="skillId" choices={skillChoices} optionText="skillName" optionValue="id" />
        </SimpleForm>
      </Create> )
  }

};

const mapStateToProps = (state) => ({
  client: state.client,
  skillChoices: state.skillChoices,
});

export const MySkillCreate = connect(mapStateToProps)(UserSkillCreate);
