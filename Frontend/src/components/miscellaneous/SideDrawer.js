import React, { useState } from "react";
import {
  Button,
  Typography,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  MenuList,
  IconButton,
  Drawer,
  selectClasses,
} from "@mui/material";
import { API_URL } from "../../Consts";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileModal from "./ProfileModal";

import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import { Select, InputLabel } from "@mui/material";

import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import { useEffect } from "react";
function SideDrawer() {
  const logId = useSelector((state) => state.user.logId);
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { setSelectedChat, notification, setNotification, chats, setChats } =
    ChatState();

  const handleSearch = async () => {
    if (!search) {
      // ... toast warning
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${API_URL}/user/users?search=${search}`
      );
      console.log(search);

      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      // ... toast error
    }
  };

  const accessChat = async (userId) => {
    try {
      console.log(userId);
      console.log(logId);

      const { data } = await axios.post(`${API_URL}/chat/`, { userId, logId });
      console.log(data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setIsOpen(false); // Closing the drawer after selecting a chat
    } catch (error) {
      // ... toast error
    }
  };
  const [selectedName, setSelectedName] = useState("");

  const [names, setNames] = useState([]); // Replace with your list of names
  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response1 = await axios.get(
          `${API_URL}/pharmacist/getAllPharmacistNames`
        );
        const response2 = await axios.get(
          `${API_URL}/pharmacist/getAllDoctorsNames`
        );
        if (user.role === "pharmacist") {
          setNames(response2.data);
        } else {
          setNames(response1.data);
        }
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };

    fetchPharmacists();
  }, []);

  const handleNameSelect = (event) => {
    setSelectedName(event.target.value);
    setSearch(event.target.value); // Set search to the selected name
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          width: "100%",
          padding: "5px 10px",
          borderWidth: "5px",
        }}
      >
        <Tooltip label="Search Users to chat" arrow placement="bottom-end">
          <Button variant="text" onClick={() => setIsOpen(true)}>
            <i className="fas fa-search"></i>
            <Typography sx={{ display: { xs: "none", md: "flex" }, pl: 1 }}>
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <Typography variant="h4" fontFamily="Work sans">
          Talk-A-Tive
        </Typography>
        <div>
          <Menu>
            <IconButton>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="large" />
            </IconButton>
            <MenuList>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <IconButton as={Button} endIcon={<ChevronDownIcon />}>
              <Avatar size="small" src={user.pic} />
            </IconButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
            </MenuList>
          </Menu>
        </div>
      </div>

      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <Typography borderBottomWidth="1px">Search Users</Typography>

        <div style={{ display: "flex", paddingBottom: 2 }}>
          <Select
            value={selectedName}
            onChange={handleNameSelect}
            style={{ marginRight: 2, width: "80%" }}
          >
            <InputLabel>Select a Name</InputLabel>
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleSearch}>Go</Button>
        </div>
        {loading ? (
          <ChatLoading />
        ) : (
          searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))
        )}
        {loadingChat && (
          <CircularProgress sx={{ marginLeft: "auto", display: "flex" }} />
        )}
      </Drawer>
    </>
  );
}

export default SideDrawer;
