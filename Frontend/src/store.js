// frontend/src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import user from "./features/userSlice.js";
import pharmacist from  "./features/pharmacistSlice.js";
import patient from "./features/patientSlice.js";
import admin from "./features/adminSlice.js";

const store = configureStore({
  reducer: {
    user,
    pharmacist,
    patient,
    admin,
  
  },
});

export default store;
