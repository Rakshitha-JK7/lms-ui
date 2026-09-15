import "./Header.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="lms-header">
      <div className="lms-header-left">
        <div className="lms-logo">L</div>

        <div className="lms-brand">
          <h2>LMS</h2>
          <p>Learning Management System</p>
        </div>
      </div>

      <div className="lms-header-right">
        <button className="lms-notification">
          <span>🔔</span>
          <i></i>
        </button>

        <div className="lms-profile">
          <div className="lms-avatar">
            {user?.fname?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="lms-user-info">
            <div className="lms-user-name">{user?.fname || "User"}</div>

            <div className="lms-user-role">{user?.role || "Student"}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
