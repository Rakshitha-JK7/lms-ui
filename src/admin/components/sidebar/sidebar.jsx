import {
  LayoutDashboard,
  Users,
  BookOpen,
  Building2,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/signin");
  };

  const handleCourses=()=>{
    navigate("/AdminCoursePage")
  }
  const handleDashboard=()=>{
    navigate("/AdminDashboard");
  }

  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-top">

        <div className="admin-menu-title">
          ADMIN MENU
        </div>

        <button className={`admin-sidebar-item ${
          location.pathname==="/AdminDashboard"? "active":""}`} onClick={handleDashboard}>
          <LayoutDashboard />
          <span>Dashboard</span>
        </button>

        <button className="admin-sidebar-item">
          <Users />
          <span>Users</span>
        </button>

        <button className={`admin-sidebar-item ${
          location.pathname==="/AdminCoursePage"? "active":""}`} onClick={handleCourses}>
          <BookOpen />
          <span>Courses</span>
        </button>

        <button className="admin-sidebar-item">
          <Building2 />
          <span>Departments</span>
        </button>

        <button className="admin-sidebar-item">
          <BarChart3 />
          <span>Reports</span>
        </button>

      </div>

      <div className="admin-sidebar-bottom">

        <div className="admin-menu-title">
          GENERAL
        </div>

        <button className="admin-sidebar-item">
          <Settings />
          <span>Settings</span>
        </button>

        <button
          className="admin-sidebar-item admin-logout"
          onClick={handleLogout}
        >
          <LogOut />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;