import React from "react";
import Form from "./common/form";
const Joi = require("joi");

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schemaObj = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit = () => this.props.history.replace("/movies");

  render() {
    return (
      <div>
        <h1>Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}

          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
