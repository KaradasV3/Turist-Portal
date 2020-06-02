import React, { Component } from "react";
import io from "socket.io-client";
import LoginForm from "./LoginForm";
import ChatContainer from "./chats/ChatContainer";
import "./index.css";
const socketUrl = "http://localhost:8000";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null,
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  /*
   *	Connect to and initializes the socket.
   */
  initSocket = () => {
    const socket = io(socketUrl);

    socket.on("layout", () => {
      console.log("Connected");
    });

    this.setState({ socket });
  };

  /*
   * 	Sets the user property in state
   *	@param user {id:number, name:string}
   */

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit("USER_CONNECTED", user);
    this.setState({ user });
  };

  /*
   *	Sets the user property in state to null.
   */
  logout = () => {
    const { socket } = this.state;
    socket.emit("LOGOUT");
    this.setState({ user: null });
  };

  render() {
    const { socket, user } = this.state;
    return (
      <div className="container">
        {!user ? (
          <LoginForm socket={socket} setUser={this.setUser} />
        ) : (
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}
export default Layout;
