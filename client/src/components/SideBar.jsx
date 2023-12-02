import React from "react";
import Compose from "../pages/Compose";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
const SideBar = ({ toggle }) => {
  const navigate = useNavigate();
  // const user = useSelector((state) => state.auth.user);
  const sidebarClass = `h-[calc(100vh-71px)] 
     bg-[#f0f0f0] transition-transform transform ${
       toggle ? "translate-x-0" : "-translate-x-full"
     }`;
  const toStarred = () => {
    navigate(`/mail/starred`);
  };
  const toInbox = () => {
    navigate(`/mail/inbox`);
  };
  const send = () => {
    navigate("/mail/send");
  };
  const bin = () => {
    navigate("/mail/bin");
  };
  return (
    <div
      className={`${sidebarClass} ${
        toggle ? "visible" : "hidden"
      }   text-blue-gray-700  py-4 font-bold`}
    >
      <div className="h-[60%] flex flex-col justify-around px-4 ">
        <div className="flex items-center cursor-pointer">
          <Compose />
        </div>
        <div
          className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-full"
          onClick={toInbox}
        >
          {" "}
          <span className="material-symbols-outlined    mr-3">inbox</span>
          <p> Inbox</p>
        </div>
        <div
          className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-full"
          onClick={toStarred}
        >
          <span className="material-symbols-outlined   mr-3">star</span>{" "}
          <p> Starred</p>
        </div>
        <div
          className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-full"
          onClick={send}
        >
          <span className="material-symbols-outlined   mr-3">send</span>{" "}
          <p> Sent</p>
        </div>
        <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-full">
          {" "}
          <span className="material-symbols-outlined mr-3">draft</span>
          <p> Draft</p>
        </div>
        <div
          className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-full"
          onClick={bin}
        >
          <span className="material-symbols-outlined   mr-3">delete</span>{" "}
          <p> Bin</p>
        </div>
        <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-full">
          <span className="material-symbols-outlined   mr-3">mail</span>{" "}
          <p> All Mails</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
