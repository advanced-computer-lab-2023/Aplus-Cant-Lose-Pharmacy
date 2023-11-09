import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
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

export const addMedicineToCart = createAsyncThunk(
  "patient/addMedicineToCart",
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/patient/addMedicineToCart/${data.userId}`,
        {
          medicineId: data.medicineId,
        }
      );

      return response; // Return the response data
    } catch (error) {
      throw error; // Throw the error so you can handle it in your components
    }
  }
);

export default patient.reducer;
export const { login } = patient.actions;
