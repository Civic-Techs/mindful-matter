import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false 
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}{required && ' *'}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
      />
    </div>
  );
};

export default FormInput;