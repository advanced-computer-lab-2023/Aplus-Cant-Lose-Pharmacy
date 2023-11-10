import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Medicine from "./Medicine";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { viewCart, viewMedicine } from "../../features/patientSlice";

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
      dispatch(viewMedicine());
    }
  }, [dispatch, value]);
  
  const { cart } = useSelector((state) => state.patient);


  useEffect(() => {
    // Call viewCart when value is "2"
    if (value === "2") {
      dispatch(viewCart({ userId: pid }));
    }
  }, [dispatch, pid, value]);
  console.log(cart);

  // console.log(medicineList)

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
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Medicine medicines={medicineList} />
        </TabPanel>
        <TabPanel value="2">
          <Cart cart={cart} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
