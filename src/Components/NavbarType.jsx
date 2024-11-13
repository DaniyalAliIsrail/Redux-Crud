import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

const NavbarType = ({ setVisible }) => {
  return (
    <div className="nav-banner-TypeStyle">
      <div className="nav-banner1">

        <div>
          <i
            className="pi pi-user"
            style={{ fontSize: "1rem", padding: "5px" }}
          ></i>
          <span>People</span>
        </div>

        <div className="nav-banner2">
          <div>
            <Button
              onClick={() => setVisible(true)}
              icon="pi pi-plus"
              size="small"
              label="People"
            />
          </div>
          <div
            className="pi pi-refresh"
            style={{ fontSize: "1.5rem", color: "blue" }}
            onClick={() => window.location.reload()}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NavbarType;
