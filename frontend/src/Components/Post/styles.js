import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  card: {
    borderWidth: 4,
    borderColor: "#024f3c",
    color: "#024f3c",
    width: "36.5vw",
    backgroundColor: "white",
    fontSize: "1.5rem",
  },

  expand: {
    transform: "rotate(0deg)",
  },

  typ1: {
    fontSize: "1.7rem",
  },

  typ2: {
    fontSize: "1rem",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: green[500],
  },

  paper: {
    margin: "1%",
    padding: "0.8%",
  },

  newcomment: {
    width: "95%",
    margin: "2.5%",
  },

  addcommentbutton: {
    marginLeft: "2.5%",
    marginRight: "auto",
    backgroundColor: "#008c7c",
    color: "white",
  },
  commentFirst: {
    textAlign: "center",
    margin: "0.5%",
  },
  acceptButton: {
    backgroundColor: "#66d17f",

    marginLeft: "auto",
  },

  deleteButton: {
    backgroundColor: "#cc5e5e",
  },
}));

export default useStyles;