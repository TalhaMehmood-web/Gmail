import React from "react";
import { useSelector } from "react-redux";

const Inbox = () => {
  const user = useSelector((state) => state.auth.user);
  return <div>inbox :{user?._id} </div>;
};

export default Inbox;
