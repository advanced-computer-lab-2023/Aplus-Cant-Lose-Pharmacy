import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";

export const addPatient = createAsyncThunk("patient/addPatient", async (data) => {
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
});

const patientInitial = {
  status: true,
  loading: false,
  username: "none",
  password: "none",
  role: "none",
  error: "",
  response: "",
  cart: [], // Initialize cart as an empty array or with initial cart data
};

export const viewCart = createAsyncThunk(
  "patient/viewCart",
  async (data) => {
    const response = await axios.get(
      `http://localhost:8000/api/patient/viewCart/${data.userId}`
    );
    console.log(response.data);
    return response;
  }
);

const patient = createSlice({
  name: "patient",
  initialState: patientInitial,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data && action.payload.data.cart) {
          state.cart = action.payload.data; // Adjust the property names based on your API response
        }
      })
      .addCase(viewCart.rejected, (state, action) => {
        state.loading = false;
      });
  },
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

export const decreaseMedicine = createAsyncThunk(
  "patient/decreaseMedicine",
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/patient/decreaseMedicine/${data.userId}`,
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

export const viewMedicine = createAsyncThunk(
  "pharmacist/viewMedicine",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/pharmacist/viewMedicine"
    );
    return response;
  }
);

export default patient.reducer;
export const { login } = patient.actions;
