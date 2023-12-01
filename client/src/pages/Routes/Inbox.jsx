import React from "react";
import { useSelector } from "react-redux";
const Inbox = () => {
  const user = useSelector((state) => state.auth.user);
  const emails = useSelector((state) => state.email.emails);
  return (
    <div>
      inbox :{user?._id} && ${emails.length}{" "}
    </div>
  );
};

export default Inbox;
