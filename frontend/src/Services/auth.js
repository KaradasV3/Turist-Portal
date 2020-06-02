import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import api from "./api";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const history = useHistory();
  const [authorized, setAuthorized] = React.useState(false);

  const login = async (username, password) => {
    try {
      const {
        data: { user },
      } = await api.post("/user/auth/login", { username, password });

      if (user) {
        localStorage.setItem("id", user._id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("surname", user.surname);
        history.push("/main", window.id);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
        toast.success(`You are logged in`);
      } else {
        toast.error("Wrong username or password!");
      }
    } catch (ex) {
      toast.error(_.get(ex, "response.data.message") || "Sorry, something went wrong");
    }
  };

  const logout = () => {
    setAuthorized(false);
    toast.error("You are logged out");
    history.push("/login");
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  return <AuthContext.Provider value={{ login, logout, authorized }} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
