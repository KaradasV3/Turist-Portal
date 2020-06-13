import { makeStyles } from "@material-ui/styles";
import background from "../../Pictures/photo2.jpg";

const useStyles = makeStyles(() => ({
  content: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },

  textField: {
    heigth: "80%",
    width: "100%",
    backgroundColor: "white",
    float: "left",
    borderRadius: "10px",
  },

  textField1: {
    heigth: "80%",
    width: "98%",
    backgroundColor: "white",
    float: "left",
    borderRadius: "10px",
  },

  fieldBox: {
    borderRadius: "10px",
    width: "100%",
    backgroundColor: "white",
    padding: "15px",
    height: "85px",
    margin: "15px",
  },

  fieldBox1: {
    borderRadius: "10px",
    width: "50%",
    height: "85px",
    float: "left",
  },

  fieldBox2: {
    borderRadius: "10px",
    width: "50%",
    height: "85px",
    float: "left",
  },

  text: {
    fontSize: "1.8rem",
  },

  nextButton: {
    heigth: "50%",
    width: "60px",
    cursor: "pointer",
    padding: "1.7%",
    bottom: "0",
    backgroundColor: "white",
  },

  search: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    borderRadius: "10px",
  },

  posts: {
    width: "100vw",
    marginBottom: "3%",
  },
}));

export default useStyles;
