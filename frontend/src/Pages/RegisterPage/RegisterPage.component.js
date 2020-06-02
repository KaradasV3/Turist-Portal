import React from "react";
import { Box, TextField, Button, Tooltip } from "@material-ui/core";
import useStyles from "./styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import api from "./../../Services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const RegisterPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setcPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "1.5em",
        },
      },
    },
  });

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlerHomepage = () => history.push("/");

  const handlerRegister = async () => {
    await Promise.all([
      api.post("/user", {
        username: username,
        password: password,
        email: email,
        name: name,
        surname: surname,
      }),
    ])

      .then((values) => {
        toast.info("Register success!");
        setTimeout(() => {
          history.push("/login");
        }, 4000);
      })

      .catch((error) => {
        toast.error("User or email name already takes!");
        console.error(error.message);
      });
  };

  return (
    // ciało strony
    <Box className={classes.body}>
      <ToastContainer></ToastContainer>
      <Box className={classes.loginBox}>
        <MuiThemeProvider theme={theme}>
          <Tooltip
            title="Username should conatain from 4 to 20 characters."
            arrow
            placement="right-start"
          >
            <Box className={classes.fieldBox}>
              <TextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                id="username"
                label="Username"
                value={username}
                onChange={handleChange(setUsername)}
                helperText={username.length < 4 ? "Username too short" : ""}
              />
            </Box>
          </Tooltip>
        </MuiThemeProvider>

        <MuiThemeProvider theme={theme}>
          <Tooltip title="Your password must be between 8 and 30." arrow placement="right-start">
            <Box className={classes.fieldBox}>
              <TextField
                className={classes.textField}
                fullWidth
                type={values.showPassword ? "text" : "password"}
                variant="outlined"
                id="password"
                label="Password"
                value={password}
                onChange={handleChange(setPassword)}
                helperText={password.length < 8 ? "Username too short" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Tooltip>
        </MuiThemeProvider>

        <MuiThemeProvider theme={theme}>
          <Tooltip title="Repete your password." arrow placement="right-start">
            <Box className={classes.fieldBox}>
              <TextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                id="cpassword"
                type="password"
                label="Confirm password"
                value={cpassword}
                onChange={handleChange(setcPassword)}
                helperText={password !== cpassword ? "Passwords are different" : ""}
              />
            </Box>
          </Tooltip>
        </MuiThemeProvider>

        <MuiThemeProvider theme={theme}>
          <Tooltip title="Remember about '@' symbol." arrow placement="right-start">
            <Box className={classes.fieldBox}>
              <TextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                id="email"
                label="e-mail"
                value={email}
                onChange={handleChange(setEmail)}
                helperText={
                  email.indexOf("@") === -1
                    ? '"@" is missing'
                    : "" || email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                    ? ""
                    : "Invalid email"
                }
              />
            </Box>
          </Tooltip>
        </MuiThemeProvider>

        <MuiThemeProvider theme={theme}>
          <Tooltip title="Whats your name?" arrow placement="right-start">
            <Box className={classes.fieldBox}>
              <TextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                id="name"
                label="Your name"
                value={name}
                onChange={handleChange(setName)}
                helperText={name.length < 2 ? "your name is too short" : ""}
              />
            </Box>
          </Tooltip>
        </MuiThemeProvider>

        <MuiThemeProvider theme={theme}>
          <Tooltip title="Whats your surname?" arrow placement="right-start">
            <Box className={classes.fieldBox}>
              <TextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                id="surname"
                label="Your surname"
                value={surname}
                onChange={handleChange(setSurname)}
                helperText={surname.length < 2 ? "your name is too short" : ""}
              />
            </Box>
          </Tooltip>
        </MuiThemeProvider>

        <Box className={classes.buttonBox}>
          <Button className={classes.button} onClick={handlerRegister}>
            Sign up
          </Button>
          <Button className={classes.button} onClick={handlerHomepage}>
            Homepage
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
