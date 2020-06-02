import React from "react";
import { Box, Typography } from "@material-ui/core";
import useStyles from "./styles";

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    // ciało strony
    <Box className={classes.body}>
      <Box className={classes.container}>
        {/* tekst w kontenerze */}
        <Box className={classes.textBox}>
          <Typography className={classes.text}> 404. Page not found.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
