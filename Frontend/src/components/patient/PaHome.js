import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Medicine from "./Medicine";
import Cart from "./Cart";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import Chatpage from "../../Pages/Chatpage";

import { viewCart, viewMedicine, getPatientOrders, getPastPatientOrders, viewPrescriptionMedicines, viewMedicineOTC } from "../../features/patientSlice";

export default function PhHome() {
  const pid = useSelector((state) => state.user.id);

  const [value, setValue] = React.useState("1");

  const dispatch = useDispatch();

  const { medicineList } = useSelector((state) => state.pharmacist);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Call viewMedicine when value is "1"
    if (value === "1") {
      dispatch(viewMedicineOTC());
      dispatch(viewPrescriptionMedicines({pid: pid}));
    }
  }, [dispatch, value, pid]);
  
  const { cart } = useSelector((state) => state.patient);
  const { orders, pastOrders } = useSelector((state) => state.patient);

  


  useEffect(() => {
    // Call viewCart when value is "2"
    if (value === "2") {
      dispatch(viewCart({ userId: pid }));
    }
  }, [dispatch, pid, value]);

  useEffect(() => {
    if(value === "3") {
      dispatch(getPatientOrders({userId: pid}));
      dispatch(getPastPatientOrders({userId: pid}));

    }
  }, [dispatch, pid, value]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            aria-label="lab API tabs example"
            onChange={handleChange} // Add this line
          >
            <Tab label="Medicine list" value="1" />
            <Tab label="View cart" value="2" />
            <Tab label="View orders" value="3" />
            <Tab label="View chats" value="4" />

          </TabList>
        </Box>
        <TabPanel value="1">
          <Medicine medicines={medicineList} />
        </TabPanel>
        <TabPanel value="2">
          <Cart cart={cart} />
        </TabPanel>
        <TabPanel value="3">
          <Orders orders={orders} pastOrders={pastOrders} />
        </TabPanel>
        <TabPanel value="4">
          <Chatpage  />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
