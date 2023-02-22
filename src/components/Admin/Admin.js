import Sidebar from "./Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import {GrReturn} from "react-icons/gr"
import { Link} from "react-router-dom";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)} >
            <FaBars className="leftside"/>
          </span>
          <div className="rightside">
            <Link to="/"><GrReturn/> HomePage</Link>
          </div>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
