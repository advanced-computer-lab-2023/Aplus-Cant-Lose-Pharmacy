import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { loginGuest } from "../../features/userSlice";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarContext } from "../../App";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const snackbarMessage = useContext(SnackbarContext);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const guest = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
    };
    const response = dispatch(loginGuest(guest));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload === undefined) {
        snackbarMessage(`error: user not found`, "error");
      } else {
        snackbarMessage("You have successfully logged in", "success");
        navigate("/Home");
      }
    });
    setIsSubmitted(true);
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label for="username">Username </label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-container">
          <label for="password">Password </label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;
