import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Consts";

// Create async thunk for adding a patient
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

// Initial state for the patient slice
const patientInitial = {
  status: true,
  loading: false,
  username: "none",
  password: "none",
  role: "none",
  error: "",
  response: "",
  cart: [], // Initialize cart as an empty array or with initial cart data
  addresses: [], // Initialize
  orders: [], // Initialize
  orderDetails: [], // Initialize
  paymentURL: "", // Initialize
  prescriptionMeds: [], // Initialize
  otcMeds: [], // Initial initialize
  pastOrders: [], // Initialize
  alternatives: null,
};

// Create async thunk for viewing the cart
export const viewCart = createAsyncThunk("patient/viewCart", async (data) => {
  const response = await axios.get(
    `${API_URL}/patient/viewCart/${data.userId}`
  );
  console.log(response.data);
  return response;
});

// Define the patient slice
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
        if (action.payload.data) {
          state.cart = action.payload.data; // Adjust the property names based on your API response
        }
      })
      .addCase(viewCart.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        if (action.payload.data && action.payload.data.addresses) {
          state.addresses = action.payload.data.addresses; // Adjust the property names based on your API response
        }
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data && action.payload.data.wallet) {
          state.wallet = action.payload.data.wallet; // Adjust the property names based on your API response
        }
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getPatientOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatientOrders.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data && action.payload.data.orders) {
          state.orders = action.payload.data.orders; // Adjust the property names based on your API response
        }
      })
      .addCase(getPatientOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getPastPatientOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPastPatientOrders.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data && action.payload.data.orders) {
          state.pastOrders = action.payload.data.orders; // Adjust the property names based on your API response
        }
      })
      .addCase(getPastPatientOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getOrderDetailsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data && action.payload.data.orderDetails) {
          state.orderDetails = action.payload.data.orderDetails; // Adjust the property names based on your API response
        }
      })
      .addCase(getOrderDetailsById.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createCartCheckoutSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCartCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.paymentURL = action.payload.data.url;
      })
      .addCase(createCartCheckoutSession.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(viewPrescriptionMedicines.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewPrescriptionMedicines.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.prescriptionMeds = action.payload.data.prescriptionMedicines;
      })
      .addCase(viewPrescriptionMedicines.rejected, (state, action) => {
        state.loading = false;
        state.prescriptionMeds = [];
      })
      .addCase(viewMedicineOTC.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewMedicineOTC.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.otcMeds = action.payload.data.medicines;
      })
      .addCase(viewMedicineOTC.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMedicinesByActiveElement.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMedicinesByActiveElement.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.alternatives = action.payload.data.similarMedicines;
      })
      .addCase(getMedicinesByActiveElement.rejected, (state, action) => {
        state.loading = false;
        state.alternatives = null;
      });
  },
});


// Create async thunk for adding medicine to the cart
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

// Create async thunk for decreasing medicine quantity in the cart
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

// Create async thunk for viewing medicine (pharmacist)
export const viewMedicine = createAsyncThunk(
  "pharmacist/viewMedicine",
  async () => {
    const response = await axios.get(
      `${API_URL}/api/pharmacist/viewMedicine`
    );
    return response;
  }
);

// Create async thunk for getting addresses
export const getAddresses = createAsyncThunk(
  "patient/getAddresses",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/getAddresses/${data.userId}`
    );
    return response;
  }
);

export const getWallet = createAsyncThunk(
  "patient/getWallet",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/getWallet/${data.userId}`
    );
    return response;
  }
);

export const addAddress = createAsyncThunk(
  "patient/addAddress",
  async (data) => {
    const response = await axios.post(
      `${API_URL}/patient/addAddress/${data.userId}`,
      { location: data.address }
    );
    return response;
  }
);

export const payForCart = createAsyncThunk(
  "patient/payForCart",
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/patient/payForCart/${data.userId}`,
        {
          paymentType: data.paymentType,
          address: data.address,
        }
      );

      return response; // Return the response data
    } catch (error) {
      throw error; // Throw the error so you can handle it in your components
    }
  }
);

export const getPatientOrders = createAsyncThunk(
  "patient/getPatientOrders",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/getPatientOrders/${data.userId}`
    );
    return response;
  }
);

export const getOrderDetailsById = createAsyncThunk(
  "patient/getOrderDetailsById",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/getOrderDetailsById/${data.oid}`
    );
    return response;
  }
);
export const cancelOrder = createAsyncThunk(
  "patient/cancelOrder",
  async (data) => {
    const response = await axios.delete(
      `${API_URL}/patient/cancelOrder/${data.oid}`
    );
    return response;
  }
);
export const createCartCheckoutSession = createAsyncThunk(
  "patient/createCartCheckoutSession",
  async (data) => {
    const response = await axios.patch(
      `${API_URL}/patient/createCartCheckoutSession/${data.pid}`,
      {
        address: data.address,
        amount: data.amount,
      }
    );
    return response;
  }
);

export const viewPrescriptionMedicines = createAsyncThunk(
  "patient/viewPrescriptionMedicines",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/viewPrescriptionMedicines/${data.pid}`
    );
    return response;
  }
);

export const viewMedicineOTC = createAsyncThunk(
  "patient/viewMedicineOTC",
  async () => {
    const response = await axios.get(
      `${API_URL}/patient/viewMedicineOTC`
    );
    return response;
  }
);

export const getPastPatientOrders = createAsyncThunk(
  "patient/getPastPatientOrders",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/getPastPatientOrders/${data.userId}`
    );
    return response;
  }
);

export const getMedicinesByActiveElement = createAsyncThunk(
  "patient/getMedicinesByActiveElement",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/patient/getMedicinesByActiveElement/${data.medId}`
    );
    return response;
  }
);



// Export the reducer and actions
export default patient.reducer;
export const { login } = patient.actions;
