import "./sidebar.css";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  FileText,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/signin");
  };

  const handleSettings =() =>{
    navigate("/StudentSettings");
  }
  const handleDashboard = () => {
    navigate("/StudentDashboard");
  };

  const handleCourses=()=>{
    navigate("/Courses");
  }

  return (
    <aside className="sidebar">

      <div className="sidebar-menu">

        <p className="sidebar-title">
          MENU
        </p>

        <button
          className={`sidebar-item ${
            location.pathname === "/StudentDashboard" ? "active" : ""
          }`}
          onClick={handleDashboard}
        >
          <LayoutDashboard className="sidebar-icon" />
          <span>Dashboard</span>
        </button>

        <button
          className={`sidebar-item ${
            location.pathname === "/Courses" ? "active" : ""
          }`}
          onClick={handleCourses}
        >
          <BookOpen className="sidebar-icon" />
          <span>Courses</span>
        </button>

        <button className="sidebar-item">
          <FileText className="sidebar-icon" />
          <span>Exams</span>
        </button>

        <button className="sidebar-item">
          <BarChart3 className="sidebar-icon" />
          <span>Progress</span>
        </button>

      </div>


      <div className="sidebar-bottom">

        <p className="sidebar-title">
          GENERAL
        </p>

        <button 
        className={`sidebar-item ${
            location.pathname === "/Settings" ? "active" : ""
          }`}
          onClick={handleSettings}>
          <Settings className="sidebar-icon" />
          <span>Settings</span>
        </button>

        <button
          className="sidebar-item logout-item"
          onClick={handleLogout}
        >
          <LogOut className="sidebar-icon" />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;