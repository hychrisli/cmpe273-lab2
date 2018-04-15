import React from 'react';

export const required = value => value ? undefined : 'Required';
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
export const maxValue = max => value =>
  value && value > max ? `Must not be more than ${max}` : undefined;
export const renderField = ({
                       input,
                       label,
                       type,
                       meta: { touched, error, warning }
                     }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
  </div>
);