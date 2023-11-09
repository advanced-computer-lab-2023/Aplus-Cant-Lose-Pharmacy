import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./components/Adminstrator/Admin";
import PaHome from "./components/patient/PaHome";
import PhHome from "./components/pharmacist/PhHome";
import Error from "./Error";
import { Outlet } from "react-router-dom";
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
      if(!loading){

        content = <Error />;
      }
  }

  return <>{content}</>;
};

export default HomeDirect;
