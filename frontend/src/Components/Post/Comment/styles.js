import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "#e3e2de",
    padding: "0.9%",
    margin: "1.5%",
  },

  autor: {
    fontSize: "1.0rem",
    color: "#190878",
  },

  message: {
    fontSize: "0.9rem",
  },
  date: {
    fontSize: "0.6rem",
    textAlign: "right",
  },
}));

export default useStyles;
