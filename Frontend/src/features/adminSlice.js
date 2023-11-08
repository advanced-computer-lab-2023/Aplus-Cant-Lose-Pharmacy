import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";
const adminInitial = {
  loading: false,
  username: "",
  role: "admin",
  error: "",
  password: "",
  patients: [],
  phJoined: [],
  phpending: [],
  response: "",
  admins: [],
  medicine: [],
};

export const viewPatients = createAsyncThunk("admin/viewPatients", async () => {
  const response = await axios.get(`${API_URL}/admin/viewPatients`);
  return response;
});
export const viewPendPh = createAsyncThunk("admin/viewPendPh", async () => {
  const response = await axios.get(`${API_URL}/admin/viewPendPh`);
  return response;
});

export const viewJoinedPh = createAsyncThunk("admin/viewJoinedPh", async () => {
  const response = await axios.get(`${API_URL}/admin/viewJoinedPh`);
  return response;
});

export const viewMedicine = createAsyncThunk("admin/viewMedicine", async () => {
  const response = await axios.get(`${API_URL}/admin/viewMedicine`);
  return response;
});



// export const searchMedicineByName = createAsyncThunk(
//   "admin/searchMedicineByName",
//   async (name) => {
//     try {
//       // Send a request to the backend to search for medicine by name
//       const response = await axios.get(
//         `http://localhost:8000/api/user/searchMedicineByName?name=${name}`
//       );

//       return response.data; // Assuming the response contains the medicine data
//     } catch (error) {
//       throw error; // Let Redux Toolkit handle error state
//     }
//   }
// );

// export const filterMedicineByUse = createAsyncThunk(
//   "admin/filterMedicineByUse",
//   async (use) => {
//     try {
//       // Send a request to the backend API endpoint with the 'use' parameter
//       const response = await axios.get(
//         `http://localhost:8000/api/user/filterMedicineByUse?use=${use}`
//       );

//       return response.data; // Assuming the response contains the medicine data
//     } catch (error) {
//       throw error; // Let Redux Toolkit handle error state
//     }
//   }
// );

export const getAdmins = createAsyncThunk("admin/getAdmins", async (data) => {
  const response = await axios.get(`${API_URL}/admin/getAdmins`);
  return response;
});

export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (data) => {
    const response = await axios.post(`${API_URL}/admin/createAdmin`, {
      username: data.username,
      password: data.password,
    });
    return response;
  }
);

export const deletePatient = createAsyncThunk(
  "admin/deletePatient",
  async (id) => {
    const response = await axios.delete(`${API_URL}/admin/deletePatient/${id}`);

    return id;
  }
);
export const deleteJPharmacist = createAsyncThunk(
  "admin/deleteJPharmacist",
  async (id) => {
    const response = await axios.delete(
      `${API_URL}/admin/deletePharmacist/${id}`
    );
    return id;
  }
);
export const deletePPharmacist = createAsyncThunk(
  "admin/deletePPharmacist",
  async (data) => {
    const response = await axios.delete(
      `${API_URL}/admin/deletePharmacist/${data.dbId}`
    );
    return response;
  }
);
export const deleteAdmin = createAsyncThunk("admin/deleteAdmin", async (id) => {
  const response = await axios.delete(`${API_URL}/admin/deleteAdmin/${id}`);
  return id;
});
export const acceptPh = createAsyncThunk("admin/acceptPh", async (id) => {
  const response = await axios.post(`${API_URL}/admin/sendAcceptEmail`, { id });
  return id;
});
export const rejectPh = createAsyncThunk("admin/rejectPh", async (id) => {
  const response = await axios.post(`${API_URL}/admin/sendRejectEmail`, { id });
  return id;
});

const admin = createSlice({
  name: "admin",
  initialState: adminInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data.patient;
        state.response = "viewPatients";
      })
      .addCase(viewPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder

      .addCase(getAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.data.admins;
        state.response = "getAdmins";
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    ///////////////////////////
    builder
      .addCase(viewPendPh.fulfilled, (state, action) => {
        state.phpending = action.payload.data.pharmacists;
        state.response = "viewPendPh";
      })
      .addCase(viewPendPh.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(viewJoinedPh.fulfilled, (state, action) => {
      state.phJoined = action.payload.data.pharmacists;
      state.response = "viewJoinedPh";
    });
    ///////////////
    builder.addCase(viewMedicine.fulfilled, (state, action) => {
      state.medicine = action.payload.data.medicines;
      state.response = "view medicine";
    });
    ///////////////////
    builder
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins.push(action.payload.data.userAdmin.username);
        state.response = "add admin";
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    ///////////////////
    builder
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = state.patients.filter(
          (item) => item._id !== action.payload
        );
        state.response = "delete patient";
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    ///////////////////////

    builder

      .addCase(deleteJPharmacist.fulfilled, (state, action) => {
        state.loading = false;
        state.phJoined = state.phJoined.filter(
          (item) => item._id !== action.payload
        );
        state.response = "delete";
      })

      .addCase(deleteJPharmacist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //////////////
    builder
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.filter(
          (item) => item._id !== action.payload
        );
        state.response = "delete";
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(acceptPh.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.phpending = state.phpending.filter(
          (item) => item._id !== action.payload
        );
        state.response = "delete HealthPackages";
      })
      .addCase(acceptPh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder.addCase(rejectPh.fulfilled, (state, action) => {
      state.loading = false;
      state.phpending = state.phpending.filter(
        (item) => item._id !== action.payload
      );
      state.response = "delete HealthPackages";
    });

  },
});

export default admin.reducer;
export const { login } = admin.actions;
