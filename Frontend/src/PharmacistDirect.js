import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const PharmacistDirect = () => {
  const { role } = useSelector((state) => state.user);

  return (
    <div>
      return <div>{role === "pharmacist" && <Outlet />}</div>;
    </div>
  );
};

export default PharmacistDirect;
