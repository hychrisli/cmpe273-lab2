import React from 'react';
import {List, Datagrid, TextField, ReferenceField, NumberField, DateField} from 'admin-on-rest';
import {Filter, BooleanInput} from 'admin-on-rest'

const PaymentFilter = (props) => (
  <Filter {...props}>
    <BooleanInput label="As Payer" source="isPayer" alwaysOn/>
  </Filter>
);

export const PaymentList = (props) => (
  <List title="Payments" {...props} filters={<PaymentFilter />}>
    <Datagrid>
      <ReferenceField label={"Payer"} source="payerId" reference={"users"} linkType="show">
        <TextField source={"username"}/>
      </ReferenceField>
      <ReferenceField label={"Payee"} source="payeeId" reference={"users"} linkType="show">
        <TextField source={"username"}/>
      </ReferenceField>
      <TextField source={"bidId"} Label={"Bid"}/>
      <ReferenceField label={"Project"} source="projectId" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <TextField source={'amount'} label={"Amount($)"}/>
      <DateField source={'time'}/>
    </Datagrid>
  </List>
);