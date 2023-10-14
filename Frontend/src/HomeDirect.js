import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./components/Adminstrator/Admin";
import PaHome from "./components/patient/PaHome";
import PhHome from "./components/pharmacist/PhHome";

import Error from "./Error";
import { Outlet } from "react-router-dom";
const HomeDirect = () => {
  const { role } = useSelector((state) => state.user);

  // Depending on the user's role, render the corresponding component
  let content = null;
  switch (role) {
    case "admin":
      content = <Admin />;
      break;
    case "pharmacist":
      content = <PhHome />;
      break;
    case "patient":
      content = <PaHome />;
      break;
    default:
      // Handle unknown or invalid roles here
      content = <Error />;
  }

  return <>{content}</>;
};

export default HomeDirect;
