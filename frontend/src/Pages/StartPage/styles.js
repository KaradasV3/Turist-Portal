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

  container: {
    background: `rgba( 52, 53, 56, 0.70)`,
    border: "2px solid white",
    borderRadius: "10px",
    width: "60%",
    minWidth: "440px",
    height: "50%",
    mixBlendMode: "hard-light",
  },

  textBox: {
    height: "30%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "5%",
    textAlign: "center",
    margin: "3%",
  },

  text: {
    fontSize: "1.8rem",
  },

  buttonBox: {
    height: "35%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    background: `rgba( 52, 53, 56, 0.85)`,
    margin: "10%",
    padding: "10px",
    fontSize: "1.5rem",
    color: "white",
    border: "2px solid white",
    minWidth: "150px",
  },
}));

export default useStyles;
