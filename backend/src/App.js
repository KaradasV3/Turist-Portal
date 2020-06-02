import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./components/index.js";
import errorHandler from "./middleware/errorHandler.js";
import rateLimiter from "./middleware/rateLimiter.js";
import socketIo from "socket.io";
import http from "http";
import * as Factories from "./Factories.js";

const app = express();
const port = 8000;

dotenv.config();
/*
 * Returns a function that will take a chat id and a boolean isTyping
 * and then emit a broadcast to the chat id that the sender is typing
 * @param sender {string} username of sender
 * @return function(chatId, message)
 */
function sendTypingToChat(user) {
  return (chatId, isTyping) => {
    io.emit(`"TYPING"-${chatId}`, { user, isTyping });
  };
}

/*
 * Returns a function that will take a chat id and message
 * and then emit a broadcast to the chat id.
 * @param sender {string} username of sender
 * @return function(chatId, message)
 */
function sendMessageToChat(sender) {
  return (chatId, message) => {
    io.emit(`"MESSAGE_RECIEVED"-${chatId}`, Factories.createMessage({ message, sender }));
  };
}

/*
 * Adds user to list passed in.
 * @param userList {Object} Object with key value pairs of users
 * @param user {User} the user to added to the list.
 * @return userList {Object} Object with key value pairs of Users
 */
function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

/*
 * Removes user from the list passed in.
 * @param userList {Object} Object with key value pairs of Users
 * @param username {string} name of user to be removed
 * @return userList {Object} Object with key value pairs of Users
 */
function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

/*
 * Checks if the user is in list passed in.
 * @param userList {Object} Object with key value pairs of Users
 * @param username {String}
 * @return userList {Object} Object with key value pairs of Users
 */
function isUser(userList, username) {
  return username in userList;
}

const whitelist = ["http://localhost:8000", "localhost:8000"];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};

const server = http.createServer(app);
const io = socketIo(server);
let connectedUsers = {};

let communityChat = Factories.createChat();
let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  console.log("Socket id:" + socket.id);

  let sendMessageToChatFromUser = sendMessageToChat(undefined);

  let sendTypingFromUser = sendTypingToChat(undefined);

  //Verify Username
  socket.on("VERIFY_USER", (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({
        isUser: false,
        user: Factories.createUser({ name: nickname, socketId: socket.id }),
      });
    } else {
      callback({
        isUser: false,
        user: Factories.createUser({ name: nickname, socketId: socket.id }),
      });
    }
  });

  //User Connects with username
  socket.on("USER_CONNECTED", user => {
    user.socketId = socket.id;
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);
    sendTypingFromUser = sendTypingToChat(user.name);

    io.emit("USER_CONNECTED", connectedUsers);
    console.log(connectedUsers);
  });

  //User disconnects
  socket.on("disconnect", () => {
    if ("user" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      io.emit("USER_DISCONNECTED", connectedUsers);
      console.log("Disconnect", connectedUsers);
    }
  });

  //User logsout
  socket.on("LOGOUT", () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit("USER_DISCONNECTED", connectedUsers);
    console.log("Disconnect", connectedUsers);
  });

  //Get Community Chat
  socket.on("COMMUNITY_CHAT", callback => {
    callback(communityChat);
  });

  socket.on("MESSAGE_SENT", ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  });

  socket.on("TYPING", ({ chatId, isTyping }) => {
    sendTypingFromUser(chatId, isTyping);
  });

  socket.on("PRIVATE_MESSAGE", ({ reciever, sender }) => {
    if (reciever in connectedUsers) {
      const newChat = Factories.createChat({
        name: `${reciever}&${sender}`,
        users: [reciever, sender],
      });
      const recieverSocket = connectedUsers[reciever].socketId;
      socket.to(recieverSocket).emit("PRIVATE_MESSAGE", newChat);
      socket.emit("PRIVATE_MESSAGE", newChat);
    }
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
server.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(rateLimiter);
app.use(router);
app.use(errorHandler);

export default app;
