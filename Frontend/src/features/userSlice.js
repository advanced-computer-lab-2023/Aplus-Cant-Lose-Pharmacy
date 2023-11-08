import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";
const userInitial = {
  logged: false,
  loading: false,
  username: "",
  password: "",
  role: "admin",
  error: "",
  response: "",
  id: 0,
};
export const sendResetEmail = createAsyncThunk(
  "user/sendResetEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/sendResetEmail`, {
        email: data,
      });

      console.log(response.token);

      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const id = data.id;
      const token = data.token;
      const response = await axios.post(
        `${API_URL}/changePassword/${id}/${token}`,
        {
          password: data.password,
        }
      );

      console.log(response.token);

      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const loginGuest = createAsyncThunk("user/loginGuest", async (data) => {
  const response = await axios.post(`${API_URL}/login`, {
    username: data.username,

    // docs: data.docs,
    password: data.password,
  });

  return response;
});
export const changePass = createAsyncThunk("admin/changePass", async (data) => {
  const response = axios
    .post(`/api/changePass/${data.username}`, data)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error.response.data);
    });
  return response;
});
const user = createSlice({
  name: "user",
  initialState: userInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginGuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.logged = true;
        state.role = action.payload.data.role;
        state.username = action.payload.data.username;
        state.id = action.payload.data.id;
        console.log(action.payload);
      })
      .addCase(loginGuest.rejected, (state, action) => {
        state.logged = false;
        state.username = "";
        state.id = 0;
        state.role = "none";
      });
      builder.addCase(changePass.fulfilled, (state, action) => {
        state.loading = false;
      state.password=action.payload.data.password;
        state.response = "delete HealthPackages";
      });
  },
});

export default user.reducer;
