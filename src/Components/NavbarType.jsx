import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import React from "react";

const NavbarType = ({ setVisible,globalFilterValue1,onGlobalFilterChangeFun }) => {
  return (
    <div>
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

            <div className="flex justify-content-end">
              <div className="flex justify-content-end">
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-search" />
                  <InputText
                    value={globalFilterValue1}
                    onChange={onGlobalFilterChangeFun}
                    className="p-inputtext-sm"
                    placeholder="Search Anything"
                  />
                </IconField>
              </div>
            </div>

            <div
              className="pi pi-refresh"
              style={{ fontSize: "1.5rem", color: "blue" }}
              onClick={() => window.location.reload()}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarType;
