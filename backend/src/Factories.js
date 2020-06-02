import _ from "lodash";
/*
 *	createUser
 *	Creates a user.
 *	@prop id {string}
 *	@prop name {string}
 *	@param {object}
 *		name {string}
 */

export const createUser = ({ name = "", socketId = null } = {}) => ({
  id: _.uniqueId(),
  name,
  socketId,
});

/*
 *	createMessage
 *	Creates a messages object.
 * 	@prop id {string}
 * 	@prop time {Date} the time in 24hr format i.e. 14:22
 * 	@prop message {string} actual string message
 * 	@prop sender {string} sender of the message
 *	@param {object}
 *		message {string}
 *		sender {string}
 */
export const createMessage = ({ message = "", sender = "" } = {}) => ({
  id: _.uniqueId(),
  time: getTime(new Date(Date.now())),
  message,
  sender,
});

/*
 *	createChat
 *	Creates a Chat object
 * 	@prop id {string}
 * 	@prop name {string}
 * 	@prop messages {Array.Message}
 * 	@prop users {Array.string}
 *	@param {object}
 *		messages {Array.Message}
 *		name {string}
 *		users {Array.string}
 *
 */
export const createChat = ({ messages = [], name = "Community", users = [] } = {}) => ({
  id: _.uniqueId(),
  name,
  messages,
  users,
  typingUsers: [],
});

/*
 *	@param date {Date}
 *	@return a string represented in 24hr time i.e. '11:30', '19:30'
 */
export const getTime = date => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};
