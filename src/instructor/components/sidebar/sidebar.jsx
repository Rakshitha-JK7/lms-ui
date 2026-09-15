import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

import "./sidebar.css";

const InstructorSidebar = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/InstructorDashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/signin");
  };

  return (
    <aside className="instructor-sidebar">

      <div className="instructor-sidebar-menu">

        <p className="instructor-sidebar-title">MENU</p>

        <button
          className="instructor-sidebar-item active"
          onClick={handleDashboard}
        >
          <LayoutDashboard className="instructor-sidebar-icon" />
          <span>Dashboard</span>
        </button>

        <button className="instructor-sidebar-item">
          <BookOpen className="instructor-sidebar-icon" />
          <span>Courses</span>
        </button>

        <button className="instructor-sidebar-item">
          <FileText className="instructor-sidebar-icon" />
          <span>Exams</span>
        </button>

        <button className="instructor-sidebar-item">
          <BarChart3 className="instructor-sidebar-icon" />
          <span>Reports</span>
        </button>

      </div>

      <div className="instructor-sidebar-bottom">

        <p className="instructor-sidebar-title">GENERAL</p>

        <button className="instructor-sidebar-item">
          <Settings className="instructor-sidebar-icon" />
          <span>Settings</span>
        </button>

        <button
          className="instructor-sidebar-item instructor-logout"
          onClick={handleLogout}
        >
          <LogOut className="instructor-sidebar-icon" />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
};

export default InstructorSidebar;