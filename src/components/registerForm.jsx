import React from "react";
import form from "./common/form";
const Joi = require("joi");

class RegisterForm extends form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schemaObj = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => this.props.history.replace("/movies");

  render() {
    return (
      <div>
        <h1 className="mt-4">Register</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
