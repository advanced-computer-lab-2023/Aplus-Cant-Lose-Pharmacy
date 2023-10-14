import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../Consts";
export const addPatient = createAsyncThunk(
  "patient/addPatient",
  async (data) => {
    const response = await axios.post(`${API_URL}/patient/addPatient`, {
      name: data.name,
      email: data.email,
      username: data.username,
      dBirth: data.dBirth,
      mobile: data.mobile,
      gender: data.gender,
      emergencyContact: data.emergencyContact,

      password: data.password,
    });

    return response;
  }
);
const patientInitial = {
  status: true,
  loading: false,
  username: "none",
  password: "none",
  role: "none",
  error: "",
  response: "",
};
const patient = createSlice({
  name: "patient",
  initialState: patientInitial,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default patient.reducer;
export const { login } = patient.actions;
