import React from "react";
import {Box, Typography, Button} from "@material-ui/core";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";

const StartPage = () => {
    
    const classes = useStyles();
    const history = useHistory();

    const handlerRegister = () => history.push("/register");
    const handlerLogin = () => history.push("/login");

    return (
        // ciało strony
        <Box className = {classes.body}> 
            <Box className = {classes.container}>
                {/* tekst w kontenerze */}
                <Box className = {classes.textBox}>
                    <Typography className = {classes.text}> Start looking around cities and surroundings by firstly visiting our tourist information points. You will find plenty of information for your needs.</Typography>   
                </Box>
                {/* przyciski */}
                <Box className = {classes.buttonBox}>
                    <Button className = {classes.button} onClick = {handlerLogin}> Sing in </Button>
                    <Button className = {classes.button} onClick = {handlerRegister}> Register </Button>  
                </Box>
            </Box> 
        </Box>
    ); 
};

export default StartPage;
