import React from 'react';
import {TextField, ReferenceField, FileField} from 'admin-on-rest';
import {TextInput, DisabledInput, FileInput, NumberInput} from 'admin-on-rest';
import {List, Datagrid, Filter} from 'admin-on-rest';
import {SimpleForm, Create, Show, SelectArrayInput} from 'admin-on-rest';
import {ViewTitle} from 'admin-on-rest';
import DownloadButton from './button-download'
import DeleteButton from './button-delete'
import NotAuthorized from '../lib/not-authorized'
import {connect} from "react-redux"
import FileUpload from './upload-file';

const ProjFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Project Id"} source={"project_id"}/>
  </Filter>
);

export const ProjFileList = (props) => (
  <List title="Files" {...props} filters={<ProjFilter/>}>
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="project_id" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <ReferenceField label={"Project"} source="project_id" reference={"projects"} linkType="show">
        <TextField source={"employer"} label={"Owner"}/>
      </ReferenceField>
      <TextField source={"file_name"}/>
      <DeleteButton/>
      <DownloadButton/>
    </Datagrid>
  </List>
);


const ProjFileUpload = (props) => {
  const {project} = props;
  const url = `${process.env.REACT_APP_API_URL}/proj-files/`;
  if (project.id === undefined)
    return (
      <NotAuthorized/>
    );
  else {
    return (
      <Create {...props} title={"Upload a file for " + project.title}>
        <FileUpload {...props}/>
      </Create>)
  }
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export const MyProjFileCreate = connect(mapStateToProps)(ProjFileUpload);