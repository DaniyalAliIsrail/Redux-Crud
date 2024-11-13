import React from "react";
import LOGO1 from "../assets/logo1.svg";

const Banner = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO1} alt="Logo" className="logo-image" />
      </div>
      <div className="profile">
        <span>Global Admin Raphans</span>
      </div>
    </div>
  );
};

export default Banner;

