import React from "react";
import FriendList from "../components/FriendList";
import NavBar from "../components/NavBar";
import "../style/LatchList.css";

const LatchList = ({ onLogout, onSwitch, theme }) => {
  return (
    <div data-theme={theme} className="parent">
      <NavBar onLogout={onLogout} onSwitch={onSwitch} theme={theme} />
      <FriendList />
    </div>
  );
};

export default LatchList;
