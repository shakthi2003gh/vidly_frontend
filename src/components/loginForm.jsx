import React from "react";
import { Redirect } from "react-router-dom";
import Form from "./common/form";
import auth from "../services/authServices";
import { toast } from "react-toastify";
const Joi = require("joi");

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schemaObj = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        toast.error(e.response.data);
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

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
