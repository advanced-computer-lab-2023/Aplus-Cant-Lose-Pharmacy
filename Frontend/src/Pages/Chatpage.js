import { Box } from '@mui/material';
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { useSelector } from "react-redux";
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
const user = useSelector((state) => state.user);
  return (
    <div style={{ width: "100%" } }>
      {console.log(user)}
      {user && <SideDrawer />}
      <Box d="flex" flexDirection ="row" >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
