import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest';
import RedirectButton from '../lib/button-redirect'

const NotAuthorized = () => (
  <Card>
    <ViewTitle title={"Not Authorized"} />
    <CardText>
      <RedirectButton/>
    </CardText>
  </Card>
);

export default NotAuthorized;