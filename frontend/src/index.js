import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./Services/auth";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const WrappedApp = () => (
  <CssBaseline>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </CssBaseline>
);

ReactDOM.render(<WrappedApp />, document.getElementById("root"));

serviceWorker.unregister();
