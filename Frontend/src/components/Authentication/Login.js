import React, { useState, useContext } from "react";
import { useDispatch,useSelector } from "react-redux";
import { loginGuest } from "../../features/userSlice";
import "./login.css";
import { useEffect } from "react";
import { SnackbarContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function App() {
  const navigate = useNavigate();
  const snackbarMessage = useContext(SnackbarContext);

  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.logged) {
      snackbarMessage("You have successfully logged in", "success");
      setIsSubmitted(true);
      navigate("/Home");
    } else if (user.error) {
      snackbarMessage("Error: user not found", "error");
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const guest = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
    };
    const response = dispatch(loginGuest(guest));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#0073e6",
    borderBottom: "1px solid transparent",
    transition: "border-bottom 0.3s",
  };

  const hoverStyle = {
    borderBottom: "1px solid #0073e6",
  };

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <div>User is successfully logged in</div>
        ) : (
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="username">Username </label>
                <input type="text" id="username" name="username" required />
              </div>
              <div className="input-container">
                <label htmlFor="password">Password </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                  /><span>
                  <InputAdornment position="end">
                    <IconButton sx={{}}onClick={toggleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment></span>
                </div>
              </div>

              <div className="options">
                <div>
                  <span>Don't have an account? </span>
                  <NavLink
                    to="/"
                    style={linkStyle}
                    activeStyle={hoverStyle}
                  >
                    Register
                  </NavLink>
                </div>

                <div>
                  <span>Forgot password? </span>
                  <NavLink
                    to="/ResetPassword"
                    style={linkStyle}
                    activeStyle={hoverStyle}
                  >
                    Reset password
                  </NavLink>
                </div>
              </div>

              <div className="button-container">
                <input type="submit" />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
