import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Flowject</h2>
      <ul>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#teams">Teams</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;