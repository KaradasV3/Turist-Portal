import React from "react";
import useStyles from "./styles";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  TextField,
  Paper,
  Button,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Comment from "./Comment/Comment.component";
import useFetch from "../../Hooks/useFetch";
import AddCommentIcon from "@material-ui/icons/AddComment";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import _ from "lodash";
import api from "./../../Services/api";
import moment from "moment";

const Post = ({
  id,
  country,
  city,
  category,
  name,
  cost,
  author,
  picture,
  description,
  date,
  accepted,
}) => {
  const postId = id;
  const classes = useStyles();
  const { data: comments, refetch: refetchComments } = useFetch("/comments");
  const nazwa = country + ", " + city;
  const avatarLetter = country[0];
  const [expanded, setExpanded] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [addShowed, setAddshowed] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [acceptButtonShowed, setAcceptButtonShowed] = React.useState(true);
  const current_user_id = localStorage.getItem("id");
  const isAdmin = current_user_id === "5e1ccda958095c0d6011ca8f";
  if (!comments) {
    return <Loader />;
  }

  let commentsToPost = comments.filter((comment) => comment.post._id === postId);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentIcon = () => {
    setShown(!shown);
  };

  const handleAddCommentIcon = () => {
    setAddshowed(!addShowed);
  };

  const handleAcceptButton = async () => {
    try {
      api.patch(`post/${id}`, {
        accepted: true,
      });
      toast.success("Post accepted");
    } catch (ex) {
      toast.error(_.get(ex, "response.data.message") || "Sorry, something went wrong");
    }
    setAcceptButtonShowed(!acceptButtonShowed);
  };

  const handleSendComment = async () => {
    try {
      api.post("/comment", {
        message: message,
        commentAuthor: current_user_id,
        date: moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss a"),
        post: postId,
      });
      toast.success("Comment added successfully");
    } catch (ex) {
      toast.error(_.get(ex, "response.data.message") || "Sorry, something went wrong");
    }

    setAddshowed(!addShowed);
    refetchComments();
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={nazwa}
        subheader={new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(date)}
        avatar={<Avatar className={classes.avatar}>{avatarLetter}</Avatar>}
      />
      {/*<CardMedia className={classes.cardMedia} imageUrl={picture} />*/}
      <CardMedia className={classes.media} image={picture} />
      <CardContent className={classes.cardContent}>
        {category !== "Cities" && <Typography className={classes.typ1}>{name}</Typography>}
        <Typography className={classes.typ1}>Category : {category}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={handleCommentIcon}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="addcomment" onClick={handleAddCommentIcon}>
          <AddCommentIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

        {isAdmin && !accepted && acceptButtonShowed && (
          <Button className={classes.acceptButton} onClick={handleAcceptButton}>
            Accept
          </Button>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography className={classes.typ2}>
            Description: {description}
            <br></br>
            Cost: {cost}
            <br></br>
            Author: {author.name + " " + author.surname}
          </Typography>
        </CardContent>
      </Collapse>
      {addShowed && (
        <Paper variant="outlined" className={classes.paper}>
          <TextField
            className={classes.newcomment}
            id="standard-multiline-static"
            label="Comment"
            multiline
            rows={3}
            value={message}
            onChange={handleChange(setMessage)}
          />
          <Button className={classes.addcommentbutton} onClick={handleSendComment}>
            Confirm
          </Button>
        </Paper>
      )}
      {commentsToPost.length > 0
        ? shown &&
          commentsToPost.map(({ comm_id, commentAuthor, message, date, post }) => (
            <Comment
              key={comm_id}
              {...{
                comm_id,
                commentAuthor,
                message,
                date,
                post,
                comm_id
              }}
            ></Comment>
          ))
        : shown && <Typography className={classes.commentFirst}>Comment first</Typography>}
    </Card>
  );
};

export default Post;
