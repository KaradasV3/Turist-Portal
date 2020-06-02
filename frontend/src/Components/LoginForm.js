import React, { Component } from "react";
import { Button } from "@material-ui/core";

const current_user_name = localStorage.getItem("name");
const current_user_surname = localStorage.getItem("surname");

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      error: "",
    };
  }

  setUser = ({ user, isUser }) => {
    if (isUser) {
      this.setError("User name taken");
    } else {
      this.setError("");
      this.props.setUser(user);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    socket.emit("VERIFY_USER", current_user_name + " " + current_user_surname, this.setUser);
  };

  handleChange = (e) => {
    this.setState({ nickname: e.target.value });
  };

  setError = (error) => {
    this.setState({ error });
  };

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <Button
            ref={(input) => {
              this.textInput = input;
            }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            variant="contained"
            color="secondary"
          >
            Connect
          </Button>
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}
