import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest';
import RedirectButton from './button-to-myskills'

const ToMySkillsButton = () => (
  <Card>
    <ViewTitle title={"See your skills"} />
    <CardText>
      <RedirectButton/>
    </CardText>
  </Card>
);

export default ToMySkillsButton;