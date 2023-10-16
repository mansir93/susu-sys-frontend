import { BiTransferAlt } from "react-icons/bi";
import { FaHouseUser } from "react-icons/fa";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaChartPie, FaBars } from "react-icons/fa";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const SidebarNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isMenuActive = (menuPath) => {
    return location.pathname === menuPath;
  };
  const style = {
    backgroundColor: "#2196f3",
  };

  return (
    <div>
      <Sidebar collapsed={collapsed} style={{ height: "100vh" }}>
        <Menu iconShape="square">
          <div className="flex flex-col gap-8">
            <MenuItem
              className=""
              icon={<FaBars />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              <h2 className="text-center font-bold">Home</h2>
            </MenuItem>
            <MenuItem
              className="py-4"
              icon={<FaBars />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              <h2 className="text-center font-bold">Admin</h2>
            </MenuItem>
            <MenuItem
              icon={<FaChartPie size={30} />}
              component={<NavLink to="/" />}
              style={isMenuActive("/") ? style : null}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<FaHouseUser size={30} />}
              component={<NavLink to="/customers" />}
              style={isMenuActive("/customers") ? style : null}
            >
              customers{" "}
            </MenuItem>
            <MenuItem
              icon={<BiTransferAlt size={30} />}
              component={<NavLink to="/transactions" />}
              style={isMenuActive("/transactions") ? style : null}
            >
              transactions
            </MenuItem>{" "}
          </div>
        </Menu>
      </Sidebar>

      {/* Sidebar */}
    </div>
  );
};

export default SidebarNav;
