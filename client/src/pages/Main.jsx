import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
const Main = () => {
  const [toggle, setToggle] = useState(true);
  const toggleSideBar = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div>
      <Header toggleSideBar={toggleSideBar} />
      <div className="w-full flex">
        <div className={`${toggle ? "w-[15%]" : "w-[0%]"}`}>
          <SideBar toggle={toggle} />
        </div>
        <div className={`${toggle ? "w-[85%]" : "w-[100%]"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
