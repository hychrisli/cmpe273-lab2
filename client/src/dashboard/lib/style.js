import React from 'react';
import Divider from 'material-ui/Divider';

export const detailStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  marginRight: '2em',
  minWidth: '8em',
  marginBottom: '2em'
};

export const buttonStyle = {
  display: 'inline-block',
  marginTop: '2em',
  marginRight: '2em',
  minWidth: '8em',
  marginBottom: '2em'
};

export const dividerStyle = {
  marginTop: '2em'
};

export const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

export const MyDivider = ({source, record = {}}) => (<Divider/>);
