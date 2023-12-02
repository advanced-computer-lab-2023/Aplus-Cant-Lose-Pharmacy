import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Medicine from "./Medicine";
import { useDispatch, useSelector } from "react-redux";
import { viewMedicine } from "../../features/pharmacistSlice";
import Chatpage from "../../Pages/Chatpage";

export default function PhHome() {
  const [value, setValue] = React.useState("1");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewMedicine());
  }, [dispatch]);

  const { medicineList } = useSelector((state) => state.pharmacist);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  console.log(medicineList)

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Medicine list" value="1" />
            <Tab label="chat Page" value="2" />
    

          </TabList>
        </Box>
        <TabPanel value="1">
          <Medicine medicines={medicineList} />
        </TabPanel>
        <TabPanel value="2">
          <Chatpage />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
