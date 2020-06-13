import React from "react";
import useStyles from "./styles";
import { Typography, Paper, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import _ from "lodash";
import api from "./../../../Services/api";

const Comment = ({ _id, commentAuthor, message, date, post }) => {
  const classes = useStyles();
  const current_user_id = localStorage.getItem("id");
  const isAdmin = current_user_id === "5e1ccda958095c0d6011ca8f";
  const [deleteButtonShowed, setDeleteButtonShowed] = React.useState(true);

  const handleDeleteButton = async () => {
    try {
      api.delete(`comment/${_id}`);
      toast.success("Comment deleted!");
    } catch (ex) {
      toast.error(_.get(ex, "response.data.message") || "Sorry, something went wrong");
    }
    setDeleteButtonShowed(false);
    window.location.reload();
  };

  return (
    <Paper variant="outlined" className={classes.paper}>
      <Typography className={classes.autor}>
        {commentAuthor.name + " " + commentAuthor.surname}
        {isAdmin && deleteButtonShowed && (
          <Button className={classes.deleteButton} onClick={handleDeleteButton}>
            Delete
          </Button>
        )}
      </Typography>
      <Typography className={classes.message}>{message}</Typography>
      <Typography className={classes.date}>
        {date[0]}
        {date[1]}
        {date[2]}
        {date[3]}-{date[5]}
        {date[6]}-{date[8]}
        {date[9]}
      </Typography>
    </Paper>
  );
};

export default Comment;