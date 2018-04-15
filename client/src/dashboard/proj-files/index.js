import React from 'react';
import {TextField, ReferenceField} from 'admin-on-rest';
import {TextInput} from 'admin-on-rest';
import {List, Datagrid, Filter} from 'admin-on-rest';
import {Create} from 'admin-on-rest';
import DownloadButton from './button-download'
import DeleteButton from './button-delete'
import NotAuthorized from '../lib/not-authorized'
import {connect} from "react-redux"
import FileUpload from './upload-file';

const ProjFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Project Id"} source={"projectId"}/>
  </Filter>
);

export const ProjFileList = (props) => (
  <List title="Files" {...props} filters={<ProjFilter/>}>
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="projectId" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <ReferenceField label={"Uploader"} source="userId" reference={"users"} linkType="show">
        <TextField source={"username"}/>
      </ReferenceField>
      <TextField source={"fileName"}/>
      <DeleteButton/>
      <DownloadButton/>
    </Datagrid>
  </List>
);


const ProjFileUpload = (props) => {
  const {project} = props;
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