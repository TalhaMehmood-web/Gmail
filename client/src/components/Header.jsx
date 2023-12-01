import React from "react";
// import axios from "../../../";
import { useSelector } from "react-redux";
const Header = ({ toggleSideBar }) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div className="bg-[#f0f0f0]">
      <div className=" flex items-center justify-between container mx-auto py-2 ">
        <div className="flex items-center">
          <span
            className="material-symbols-outlined mr-4 cursor-pointer"
            onClick={toggleSideBar}
          >
            menu
          </span>
          <img
            src="https://static.dezeen.com/uploads/2020/10/gmail-google-logo-rebrand-workspace-design_dezeen_2364_col_0.jpg "
            className="w-20 
            invert-[-100%]"
            alt=""
          />
        </div>
        <div className="flex items-center min-w-[690px] max-w-[720px] justify-between border border-blue-gray-300 rounded-md h-10 px-4 bg-[#EAF1FB] ">
          <span className="material-symbols-outlined ">search</span>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full outline-none px-4 bg-transparent border-none  "
          />
          <span className="material-symbols-outlined">tune</span>
        </div>
        <div className="flex items-center">
          <span className="material-symbols-outlined mr-3 ">help</span>
          <span className="material-symbols-outlined mr-3 ">settings</span>
          <span className="material-symbols-outlined mr-3 ">apps</span>
          {user.picture ? (
            <img
              src={`../../../server/uploads/UserImages/${user?.picture}`}
              alt="ss2"
            />
          ) : (
            <span className="material-symbols-outlined  ">person</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
