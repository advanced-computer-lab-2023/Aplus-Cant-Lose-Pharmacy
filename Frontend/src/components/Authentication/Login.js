import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { loginGuest } from "../../features/userSlice";
import "./login.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";
// ... Other import statements ...

function App() {
  const navigate = useNavigate();
  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const snackbarMessage = useContext(SnackbarContext);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const linkStyle = {
    textDecoration: "none",
    color: "#0073e6",
    borderBottom: "1px solid transparent",
    transition: "border-bottom 0.3s",
  };

  const hoverStyle = {
    borderBottom: "1px solid #0073e6",
  };
  useEffect(() => {
    // This effect will run when the user variable changes
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
    dispatch(loginGuest(guest));
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
                <input type="password" id="password" name="password" required />
              </div>

              <div className="options">
                <div>
                  <span>Don't have an account? </span>
                  <NavLink
                    to="/RegisterAs"
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
