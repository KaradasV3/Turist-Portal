import { makeStyles } from "@material-ui/styles";
import background from "../../Pictures/photo2.jpg";

const useStyles = makeStyles(() => ({
  body: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },

  loginBox: {
    position: "relative",
    border: "2px solid white",
    borderRadius: "10px",
    width: "45%",
    minWidth: "440px",
    height: "80%",
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      background: `rgba( 52, 53, 56, 0.70)`,
      mixBlendMode: "hard-light",
    },
  },

  textField: {
    width: "100%",
    backgroundColor: "white",
  },

  fieldBox: {
    backgroundColor: "white",
    position: "relative",
    borderRadius: "10px",
    padding: "10px",
    margin: "5%",
    width: "86%",
  },

  buttonBox: {
    height: "25%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    background: `rgba( 52, 53, 56, 0.85)`,
    margin: "10%",
    padding: "10px 8px",
    fontSize: "1.5rem",
    color: "white",
    border: "2px solid white",
    minWidth: "150px",
    marginBottom: "180px",
  },
}));

export default useStyles;
