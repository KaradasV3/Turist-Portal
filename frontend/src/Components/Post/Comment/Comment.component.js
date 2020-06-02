import React from "react";
import useStyles from "./styles";
import { Typography, Paper } from "@material-ui/core";

const Comment = ({ id, commentAuthor, message, date, post }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.paper}>
      <Typography className={classes.autor}>
        {commentAuthor.name + " " + commentAuthor.surname}
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
