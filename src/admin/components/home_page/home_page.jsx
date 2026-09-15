import "./home_page.css";

const HomePage =()=>{
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className="admin-home">

      <section className="admin-welcome">

        <div>
          <p className="admin-welcome-label">
            ADMIN DASHBOARD
          </p>

          <h1>
            Welcome back, {user?.fname || "Admin"}!
          </h1>

          <p className="admin-welcome-text">
            Manage your LMS, users, courses and academic activities
            from one place.
          </p>
        </div>

      </section>

      <section className="admin-stats">

        <div className="admin-stat-card">

          <div className="admin-stat-icon users-icon">
            👥
          </div>

          <div>
            <p>Total Users</p>
            <h2>248</h2>
          </div>

        </div>


        <div className="admin-stat-card">

          <div className="admin-stat-icon students-icon">
            🎓
          </div>

          <div>
            <p>Students</p>
            <h2>210</h2>
          </div>

        </div>


        <div className="admin-stat-card">

          <div className="admin-stat-icon instructors-icon">
            👨‍🏫
          </div>

          <div>
            <p>Instructors</p>
            <h2>32</h2>
          </div>

        </div>


        <div className="admin-stat-card">

          <div className="admin-stat-icon courses-icon">
            📚
          </div>

          <div>
            <p>Total Courses</p>
            <h2>24</h2>
          </div>

        </div>

      </section>

      <section className="admin-main-grid">

        <div className="admin-panel">

          <div className="admin-panel-header">

            <div>
              <h2>Recent Users</h2>

              <p>
                Recently registered users
              </p>
            </div>

            <button>
              View All
            </button>

          </div>


          <div className="admin-user-list">

            <div className="admin-user">

              <div className="admin-user-avatar">
                JD
              </div>

              <div className="admin-user-details">

                <h4>
                  John Doe
                </h4>

                <p>
                  john@example.com
                </p>

              </div>

              <span className="user-role student-role">
                Student
              </span>

            </div>


            <div className="admin-user">

              <div className="admin-user-avatar">
                RS
              </div>

              <div className="admin-user-details">

                <h4>
                  Rahul Sharma
                </h4>

                <p>
                  rahul@example.com
                </p>

              </div>

              <span className="user-role student-role">
                Student
              </span>

            </div>


            <div className="admin-user">

              <div className="admin-user-avatar">
                PM
              </div>

              <div className="admin-user-details">

                <h4>
                  Priya Menon
                </h4>

                <p>
                  priya@example.com
                </p>

              </div>

              <span className="user-role instructor-role">
                Instructor
              </span>

            </div>

          </div>

        </div>

        <div className="admin-panel">

          <div className="admin-panel-header">

            <div>
              <h2>Course Overview</h2>

              <p>
                Current course progress
              </p>
            </div>

            <button>
              View All
            </button>

          </div>


          <div className="course-item">

            <div className="course-info">

              <h4>
                Web Development
              </h4>

              <p>
                42 students
              </p>

            </div>

            <strong>
              80%
            </strong>

          </div>

          <div className="course-progress">
            <div style={{ width: "80%" }}></div>
          </div>


          <div className="course-item">

            <div className="course-info">

              <h4>
                Data Structures
              </h4>

              <p>
                56 students
              </p>

            </div>

            <strong>
              65%
            </strong>

          </div>

          <div className="course-progress">
            <div style={{ width: "65%" }}></div>
          </div>


          <div className="course-item">

            <div className="course-info">

              <h4>
                Database Management
              </h4>

              <p>
                38 students
              </p>

            </div>

            <strong>
              72%
            </strong>

          </div>

          <div className="course-progress">
            <div style={{ width: "72%" }}></div>
          </div>

        </div>

      </section>


      <section className="admin-panel activity-panel">

        <div className="admin-panel-header">

          <div>
            <h2>
              Recent Activity
            </h2>

            <p>
              Latest activities in the LMS
            </p>
          </div>

        </div>


        <div className="activity-item">

          <div className="activity-icon">
            +
          </div>

          <div className="activity-details">

            <h4>
              New student registered
            </h4>

            <p>
              John Doe joined the LMS
            </p>

          </div>

          <span>
            2 hours ago
          </span>

        </div>


        <div className="activity-item">

          <div className="activity-icon">
            +
          </div>

          <div className="activity-details">

            <h4>
              New course created
            </h4>

            <p>
              Web Development course was added
            </p>

          </div>

          <span>
            5 hours ago
          </span>

        </div>


        <div className="activity-item">

          <div className="activity-icon">
            +
          </div>

          <div className="activity-details">

            <h4>
              New instructor registered
            </h4>

            <p>
              Priya Menon joined as instructor
            </p>

          </div>

          <span>
            Yesterday
          </span>

        </div>

      </section>

    </main>
  );
};


export default HomePage;