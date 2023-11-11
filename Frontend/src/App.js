import React, { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import HomeDirect from "./HomeDirect";
import AdminDirect from "./AdminDirect";
import PharmacistDirect from "./PharmacistDirect";
import Start from "./components/Start";
import Checkout from "./components/patient/Checkout";


import "dayjs/plugin/weekOfYear";
import "dayjs/plugin/customParseFormat";
import "dayjs/plugin/localizedFormat";
import "dayjs/plugin/isBetween";

import Login from "./components/Authentication/Login";
import RegisterAs from "./components/Authentication/RegisterAs";

import RegisterAsPatient from "./components/Authentication/RegisterAsPatient";
import RegisterAsPharmacist from "./components/Authentication/RegisterAsPharmacist";
import Upload from "./components/pharmacist/Upload";

import ResetPassword from "./components/Authentication/ResetPassword";
import ChangePass from "./components/Authentication/ChangePass";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Error from "./Error";
import { Snackbar, Alert } from "@mui/material";
import AddMedicine from "./components/pharmacist/AddMedicine";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Start />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/reset_password/:id/:token" element={<ChangePass />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/RegisterAs" element={<RegisterAs />} />
      <Route path="/RegisterAsPatient" element={<RegisterAsPatient />} />
      <Route path="/RegisterAsPharmacist" element={<RegisterAsPharmacist />} />
      <Route path="/Upload" element={<Upload />} />
      <Route path="/Checkout" element={<Checkout />} />

      <Route path="/Home" element={<HomeDirect />} />
      <Route path="/Medicine/add" element={<AddMedicine />} />

      <Route path="*" element={<Error />} />
    </Route>
  )
);

// Severitys:
// success
// error
// info
// warning
export const SnackbarContext = createContext();

const App = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  function displaySnackbar(message, severity) {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  return (
    <div>
      <SnackbarContext.Provider value={displaySnackbar}>
        <RouterProvider router={router} />
      </SnackbarContext.Provider>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default App;
