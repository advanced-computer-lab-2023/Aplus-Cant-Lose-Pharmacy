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
export const loginGuest = createAsyncThunk("user/loginGuest", async (data) => {
  const response = await axios.post(`${API_URL}/login`, {
    username: data.username,

    // docs: data.docs,
    password: data.password,
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
  },
});

export default user.reducer;
