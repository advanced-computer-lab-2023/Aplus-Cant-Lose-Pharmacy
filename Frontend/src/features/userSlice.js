import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";

const userInitial = {
  logged: false,
  loading: true,
  username: "",
  password: "",
  role: "",
  error: false,
  response: "",
  id: 0,
};
export const sendResetEmail = createAsyncThunk(
  "user/sendResetEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/sendResetEmail`, {
        username: data,
      });

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
      console.log(data.token);

      const response = await axios.post(
        `${API_URL}/changePassword/${id}/${token}`,
        {
          password: data.password,
        }
      );


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
export const logout = createAsyncThunk(
  "user/logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/logout`);

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
export const changePass = createAsyncThunk("user/changePass", async (data) => {
  console.log(data);
  const response = axios
    .post(`${API_URL}/changePass/${data.username}`, data)
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
  initialState: {
    ...userInitial,
    ...JSON.parse(localStorage.getItem("user") || "{}"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginGuest.pending, (state) => {
        state.loading = true;
        state.error = false;

      })
      .addCase(loginGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.logged = true;
        state.role = action.payload.data.role;
        state.username = action.payload.data.userData.fUser.username;
        state.id = action.payload.data.userData.fUser._id;
        state.error = false;

        localStorage.setItem("user", JSON.stringify({
          username: state.username,
          role: state.role,
          id: state.id,
        }));
        console.log(action.payload);
      })
      .addCase(loginGuest.rejected, (state, action) => {
        state.logged = false;
        state.username = "";
        state.id = 0;
        state.loading = false;

        state.role = "none";
        state.error = true;
      });
    builder.addCase(changePass.fulfilled, (state, action) => {
      state.loading = false;
      state.response = "delete HealthPackages";
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.password = action.payload.password;
      state.response = "delete HealthPackages";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.token = null;
      state.logged = false;
      state.username = "";
      state.password = "";
      state.role = "";
      state.id = "";
      state.loading = false;

      localStorage.removeItem("user"); // Remove the user token

      console.log(action.payload);
      console.log(state);
    });
  
  },
});

export default user.reducer;
