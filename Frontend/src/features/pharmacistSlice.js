import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";
const pharmacistInitial = {
  status: true,
  loading: false,
  username: "none",
  password: "none",
  role: "none",
  error: "",
  response: "",
  medicineList: [],
};

export const addPharmacist = createAsyncThunk(
  "pharmacist/addPharmacist",
  async (data) => {
    const response = await axios.post(`${API_URL}/pharmacist/addPharmacist`, {
      name: data.name,
      email: data.email,
      username: data.username,
      dBirth: data.dBirth,
      rate: data.rate,
      gender: data.gender,
      affilation: data.affilation,
      background: data.background,
      // docs: data.docs,
      password: data.password,
    });

    return response;
  }
);
export const addMedicine = createAsyncThunk(
  "pharmacist/addMedicine",
  async (data) => {
    const response = await axios.post(`${API_URL}/pharmacist/addMedicine`, {
      activeElement: data.activeElement,
      price: data.price,
      use: data.use,
      name: data.name,
      amount: data.amount,
      imgurl: data.imgurl,
    });

    return response;
  }
);
export const updateMedicineDetails = createAsyncThunk(
  "pharmacist/updateMedicineDetails",
  async (data) => {
    const response = await axios.put(
      `${API_URL}/pharmacist/updateMedicineDetails`,
      {
        data
      }
    );

    return response;
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
export const pharmacist = createSlice({
  name: "pharmacist",
  initialState: pharmacistInitial,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.role = action.payload;
    },
    deleteMedicine: (state, action) => {
      console.log(action.payload);
      let database_id = action.payload.database_id;
      let array_index = action.payload.index;

      let newMedicineList = [...state.medicineList];

      let replacementMedicineList = newMedicineList.filter(
        (medicine, index) => {
          return index !== array_index;
        }
      );

      state.medicineList = replacementMedicineList;
    },
    editMedicine: (state, action) => {
      console.log(action.payload);

      let array_index = action.payload.idx;

      state.medicineList[array_index] = {
        ...action.payload.newData,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPharmacist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPharmacist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addPharmacist.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(viewMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicineList = action.payload.data.medicines;
        console.log(action.payload.data.medicines);
      })
      .addCase(viewMedicine.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(addMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMedicine.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data.medicine);
        state.medicineList.push(action.payload.data.medicine);
      })
      .addCase(addMedicine.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(updateMedicineDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMedicineDetails.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMedicineDetails.rejected, (state, action) => {
        state.loading = false;
        console.log(action.message);
      });
  },
});

export default pharmacist.reducer;
export const { login, deleteMedicine, editMedicine } = pharmacist.actions;
