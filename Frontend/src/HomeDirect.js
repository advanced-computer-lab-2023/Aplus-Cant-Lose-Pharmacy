import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./components/Adminstrator/Admin";
import PaHome from "./components/patient/PaHome";
import PhHome from "./components/pharmacist/PhHome";
import Error from "./Error";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import {Link} from "react-router-dom";
import AccountAvatar from "./components/Authentication/AccountAvatar" // Import the AccountAvatar component
const containerStyles = {
  display: "flex",
  justifyContent: "flex-end", // Align content to the right
  alignItems: "center",

  height: "fit-content",
  backgroundColor: "whitesmoke",
  borderRadius: "7px",
  paddingRight: "15px",
  paddingBottom: "2px",
  paddingTop: "2px", // Center items vertically
};
const HomeDirect = () => {
  const { role ,loading} = useSelector((state) => state.user);
  const navigate = useNavigate();
  // Depending on the user's role, render the corresponding component
  let content = (<></>);
  switch (role) {
    case "admin":
      content = (
        <>
          <AccountAvatar sx={containerStyles} /> {/* Add AccountAvatar component here */}
          <Admin />
        </>
      );
      break;
    case "pharmacist":
      content = (
        <>
          <AccountAvatar sx={containerStyles}/> {/* Add AccountAvatar component here */}
          <PhHome />
        </>
      );
      break;
    case "patient":
      content = (
        <>
          <AccountAvatar sx={containerStyles}/> {/* Add AccountAvatar component here */}
          <PaHome />
        </>
      );
      break;
    default:
      // Handle unknown or invalid roles here


        content = 
        <>
        <Link to="/Login" sx={{ left: "100%" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              fontSize: "20px",
              maragin: "auto",
            }}
          >
            Login
          </Typography>
        </Link>
      </>
  }

  return <>{content}</>;
};

export default HomeDirect;
