import React, { Component } from "react";
import { Input, Select } from "./inputs";
const Joi = require("joi");

class Form extends Component {
  state = { data: {}, errors: {} };

  schema = Joi.object(this.schemaObj);

  validate = () => {
    const errors = {};
    Object.keys(this.state.data).forEach((input) => {
      errors[input] = this.validateProperty({
        name: input,
        value: this.state.data[input],
      });
    });

    Object.keys(errors).forEach((error) => {
      if (!errors[error]) delete errors[error];
    });

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    const schema = Joi.object({ [name]: this.schemaObj[name] });
    const obj = { [name]: value };
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
