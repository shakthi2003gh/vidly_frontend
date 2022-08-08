import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        {...rest}
        style={{ width: 100 + "%", padding: 0.5 + "rem" }}
        className="form-control"
      >
        <option defaultValue="" />

        {options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export { Input, Select };
