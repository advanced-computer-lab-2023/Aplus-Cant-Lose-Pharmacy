import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { sendResetEmail } from "../../features/userSlice";
import { SnackbarContext } from "../../App";
import {useNavigate} from "react-router-dom";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const snackbarMessage = useContext(SnackbarContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

  const response=  dispatch(sendResetEmail(email));
  
      if (response) {
        snackbarMessage("Check your email", "success");
        navigate("/Login");
      } else {
        snackbarMessage(`error: ${response.message} has occurred`, "error");
      }
  
  };

  return (
    <div style={styles.pageCenter}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Reset Password</h1>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="email" style={styles.label}>
              Username:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderLeft: "5px solid #0073e6",
    borderRight: "5px solid #0073e6",
    width: "80%",
    padding: "20px", // Increased padding
  },
  heading: {
    fontSize: "24px",
    margin: "10px 0",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontSize: "16px",
  },
  input: {
    padding: "15px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
  },
  button: {
    backgroundColor: "#0073e6",
    color: "white",
    padding: "15px 30px 15px 20px", // Added padding to the right
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default ResetPassword;
