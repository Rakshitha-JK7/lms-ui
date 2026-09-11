import "./sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-menu">

        <p className="sidebar-title">
          MENU
        </p>

        <button className="sidebar-item active">
          <span className="sidebar-icon">⌂</span>
          <span>Dashboard</span>
        </button>

        <button className="sidebar-item">
          <span className="sidebar-icon">▣</span>
          <span>Courses</span>
        </button>

        <button className="sidebar-item">
          <span className="sidebar-icon">✓</span>
          <span>Assignments</span>
        </button>

        <button className="sidebar-item">
          <span className="sidebar-icon">◈</span>
          <span>Exams</span>
        </button>

        <button className="sidebar-item">
          <span className="sidebar-icon">◫</span>
          <span>Progress</span>
        </button>

      </div>


      <div className="sidebar-bottom">

        <p className="sidebar-title">
          GENERAL
        </p>

        <button className="sidebar-item">
          <span className="sidebar-icon">⚙</span>
          <span>Settings</span>
        </button>

        <button className="sidebar-item">
          <span className="sidebar-icon">↪</span>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;