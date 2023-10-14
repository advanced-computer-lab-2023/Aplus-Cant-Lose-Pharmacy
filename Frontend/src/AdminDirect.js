import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const AdminDirect = () => {
  const { role } = useSelector((state) => state.user);
  return <div>{(role==="admin" )&& <Outlet />}</div>;
};

export default AdminDirect;
