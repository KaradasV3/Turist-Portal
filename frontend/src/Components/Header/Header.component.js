import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "../../Services/auth";
import { ToastContainer } from "react-toastify";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from "@material-ui/icons/Email";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddPostDialog from "./AddPostDialog";
import ChatDialog from "./ChatDialog";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const [isOpenMesseges, setIsOpenMesseges] = React.useState(false);
  const closeMesseges = () => setIsOpenMesseges(false);
  const OpenMesseges = () => setIsOpenMesseges(true);

  const useStyles = makeStyles(() => ({
    button: {
      margin: "0.1%",
      fontSize: "1.0rem",
      color: "white",
      marginLeft: "13%",
      marginRight: "13%",
      backgroundColor: "#024f3c",
      padding: "10px",
      whiteSpace: "nowrap",
    },

    toolBar: {
      width: "auto",
      backgroundColor: "#024f3c",
    },
  }));

  const classes = useStyles();
  const auth = useAuth();

  return (
    <>
      <AppBar position="absolute">
        <ToastContainer></ToastContainer>
        <Toolbar className={classes.toolBar}>
          <Button className={classes.button} onClick={openModal}>
            ADD POST
            <AddIcon size="medium" style={{ marginLeft: "10px" }}></AddIcon>
          </Button>

          <Button className={classes.button} onClick={OpenMesseges}>
            Messeges
            <EmailIcon size="medium" style={{ marginLeft: "10px" }}></EmailIcon>
          </Button>

          <Button className={classes.button} onClick={auth.logout}>
            Logout
            <ExitToAppIcon size="medium" style={{ marginLeft: "10px" }}></ExitToAppIcon>
          </Button>
        </Toolbar>
      </AppBar>

      <AddPostDialog {...{ isOpen, closeModal }} />
      <ChatDialog {...{ isOpenMesseges, closeMesseges }}></ChatDialog>
    </>
  );
};

export default Header;
