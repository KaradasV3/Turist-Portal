import React from "react";
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Layout from "../../Layout";
const ChatDialog = ({ isOpenMesseges, closeMesseges }) => {
  return (
    <Dialog open={isOpenMesseges} onClose={closeMesseges} maxWidth="md">
      <DialogTitle>Turist Helpes Messeges</DialogTitle>
      <DialogContent>
        <Grid spacing={2} container justify="center">
          <Grid item xs={"auto"}>
            <Layout></Layout>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeMesseges} variant="contained">
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDialog;
