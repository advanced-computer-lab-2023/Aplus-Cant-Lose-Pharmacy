import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";


import AddAdmin from "./AddAdmin";
import MedicinesShow from "./MedicinesShow";
import PendingPharmacists from "./PendingPharmacists";
import JoinedPharmacists from "./JoinedPharmacists";
import Patients from "./Patients";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          padding: "10px",
        }}
      >
        <div>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Add administrator" {...a11yProps(0)} sx={{ width: "150px" }} />
            <Tab label="View Pharmacists Join Requests" {...a11yProps(1)} sx={{ width: "150px" }} />
            <Tab label="Joined Pharmacists" {...a11yProps(2)} sx={{ width: "150px" }} />
            <Tab label="Patients List" {...a11yProps(3)} sx={{ width: "150px" }} />
            <Tab label="View All Medicines" {...a11yProps(4)} sx={{ width: "150px" }} />
          </Tabs>
        </div>
      
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddAdmin />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PendingPharmacists />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <JoinedPharmacists />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Patients />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <MedicinesShow />
      </CustomTabPanel>


    </div>
  );
}
