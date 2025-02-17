import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";
const pharmacistInitial = {
  status: true,
  loading: false,
  username: "none",
  password: "none",
  role: "pharmacist",
  error: "",
  response: "",
  medicineList: [],
  newPhId: 0,
  report: [],
  wallet: 0,
  alerts: [],
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
      type: data.type,
    });

    return response;
  }
);
export const updateMedicineDetails = createAsyncThunk(
  "pharmacist/updateMedicineDetails",
  async (data) => {
    const response = await axios.put(
      `${API_URL}/pharmacist/updateMedicineDetails/${data.id}`,

      data
    );

    return response;
  }
);
export const archiveMedicine = createAsyncThunk(
  "pharmacist/archiveMedicine",
  async ({ id, endpoint }) => {
    await axios.put(`${API_URL}/pharmacist/${endpoint}/${id}`);
    const response = await axios.get(`${API_URL}/pharmacist/viewMedicineAll`);
    return response;
  }
);

export const viewMedicine = createAsyncThunk(
  "pharmacist/viewMedicine",
  async () => {
    const response = await axios.get(`${API_URL}/pharmacist/viewMedicineAll`);
    return response;
  }
);
export const getOrdersInMonth = createAsyncThunk(
  "pharmacist/getOrdersInMonth",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/pharmacist/getOrdersInMonth?month=${data.month}&year=${data.year}`
    );
    console.log(response);
    return response;
  }
);
export const pharmacistGetWallet = createAsyncThunk(
  "pharmacist/pharmacistGetWallet",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/pharmacist/pharmacistGetWallet/${data.id}`
    );
    console.log(response);
    return response;
  }
);
export const getMedicinesWithZeroAmount = createAsyncThunk(
  "pharmacist/getMedicinesWithZeroAmount",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/pharmacist/getMedicinesWithZeroAmount`
    );
    console.log(response);
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

    archive: (state, action) => {
      const index = action.payload;
      const currentStatus = state.medicineList[index].status;

      // Toggle the status between 'archived' and 'unarchived'
      state.medicineList[index].status =
        currentStatus === "archived" ? "unarchived" : "archived";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPharmacist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPharmacist.fulfilled, (state, action) => {
        state.loading = false;
        state.newPhId = action.payload.data.id;
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
        if (action.payload.data && action.payload.data.medicines) {
          state.medicineList = action.payload.data.medicines;
          console.log(action.payload.data.medicines);
        }
      })
      .addCase(viewMedicine.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(pharmacistGetWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(pharmacistGetWallet.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data && action.payload.data.wallet) {
          state.wallet = action.payload.data.wallet;
          console.log(action.payload.data.wallet);
        }
      })
      .addCase(pharmacistGetWallet.rejected, (state, action) => {
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
      .addCase(getMedicinesWithZeroAmount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMedicinesWithZeroAmount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.alerts = action.payload.data.zeroAmountMedicines;
        }
      })
      .addCase(getMedicinesWithZeroAmount.rejected, (state, action) => {
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
    builder
      .addCase(getOrdersInMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersInMonth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.report = action.payload.data;
          console.log(state.report);
        }
      })
      .addCase(getOrdersInMonth.rejected, (state, action) => {
        state.loading = false;
      });
    builder.addCase(archiveMedicine.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data && action.payload.data.medicines) {
        state.medicineList = action.payload.data.medicines;
        console.log(state.medicineList);
      }
    });
  },
});

export default pharmacist.reducer;
export const { login, deleteMedicine, editMedicine, archive } =
  pharmacist.actions;
