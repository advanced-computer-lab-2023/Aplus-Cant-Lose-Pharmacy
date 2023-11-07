import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { changePassword } from "../../features/userSlice";
import { SnackbarContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePass = () => {
  const [email, setEmail] = useState("");
  const { id, token } = useParams();
  const snackbarMessage = useContext(SnackbarContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const password = event.target.elements.password.value;
    const password2 = event.target.elements.password2.value;
    if (password !== password2) {
      snackbarMessage(`error: not matched password`, "error");
    } else {
      const response = dispatch(changePassword({ password, id, token }));

      if (response) {
        snackbarMessage("Password has been changed", "success");
        navigate("/Login");
      } else {
        snackbarMessage(`error: ${response.message} has occurred`, "error");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div style={styles.pageCenter}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Change Password</h1>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <div style={styles.passwordInputContainer}>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                style={styles.input}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <label htmlFor="password2" style={styles.label}>
              Repeat Password:
            </label>
            <div style={styles.passwordInputContainer}>
              <OutlinedInput
                type={showPassword2 ? "text" : "password"}
                required
                id="password2"
                name="password2"
                style={styles.input}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword2}>
                      {showPassword2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <button type="submit" style={styles.button}>
              Change Password
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
    width:"100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width:"50%",
  },
  label: {
    fontSize: "16px",
  },
  input: {
    padding: "15px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%", // Wider input fields
  },
  passwordInputContainer: {
    display: "flex",
    alignItems: "center",
    width: "60%", // Wider input fields

  },
  showPasswordButton: {
    marginLeft: "10px",
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

export default ChangePass;
