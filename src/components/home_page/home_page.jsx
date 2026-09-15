import "./home_page.css";

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className="dashboard-home">
      <section className="welcome-card">
        <div className="welcome-content">
          <span className="welcome-tag">STUDENT DASHBOARD</span>

          <h1>Welcome back, {user?.fname || "Student"}!</h1>

          <p>Continue your learning journey and keep making progress.</p>
        </div>
        <div className="welcome-illustration">
          <div className="welcome-circle">🎓</div>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">📚</div>

            <div className="stat-content">
              <span>Total Courses</span>
              <h2>6</h2>
            </div>
          </div>
        </section>

        <div className="stat-card">
          <div className="stat-icon purple">◔</div>

          <div className="stat-content">
            <span>Overall Progress</span>
            <h2>72%</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">✓</div>

          <div className="stat-content">
            <span>Assignments</span>
            <h2>4</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">◈</div>

          <div className="stat-content">
            <span>Upcoming Exams</span>
            <h2>2</h2>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>My Courses</h2>
            <p>Continue where you left off</p>
          </div>

          <button className="view-all-btn">
            View all
            <span>→</span>
          </button>
        </div>

        <div className="course-grid">
          <div className="course-card">
            <div className="course-card-top">
              <div className="course-logo blue-logo">WD</div>

              <span className="course-badge">In Progress</span>
            </div>

            <h3>Web Development</h3>

            <p>Learn HTML, CSS, JavaScript and React.</p>

            <div className="course-progress-info">
              <span>Progress</span>

              <strong>80%</strong>
            </div>

            <div className="progress-track">
              <div className="progress-fill" style={{ width: "80%" }}></div>
            </div>

            <button className="continue-btn">
              Continue Learning
              <span>→</span>
            </button>
          </div>

          <div className="course-card">
            <div className="course-card-top">
              <div className="course-logo purple-logo">DS</div>

              <span className="course-badge">In Progress</span>
            </div>

            <h3>Data Structures</h3>

            <p>Master algorithms and problem solving.</p>

            <div className="course-progress-info">
              <span>Progress</span>

              <strong>60%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill purple-progress"
                style={{ width: "60%" }}
              ></div>
            </div>

            <button className="continue-btn">
              Continue Learning
              <span>→</span>
            </button>
          </div>

          <div className="course-card">
            <div className="course-card-top">
              <div className="course-logo green-logo">DB</div>

              <span className="course-badge">In Progress</span>
            </div>

            <h3>Database Management</h3>

            <p>Learn SQL, PostgreSQL and database design.</p>

            <div className="course-progress-info">
              <span>Progress</span>

              <strong>45%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill green-progress"
                style={{ width: "45%" }}
              ></div>
            </div>

            <button className="continue-btn">
              Continue Learning
              <span>→</span>
            </button>
          </div>
        </div>
      </section>
      <section className="bottom-grid">
        {/* UPCOMING ASSIGNMENTS */}

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h2>Upcoming Assignments</h2>
              <p>Don't miss your deadlines</p>
            </div>

            <button className="small-view-btn">View all</button>
          </div>

          <div className="assignment-list">
            <div className="assignment-item">
              <div className="assignment-icon">DB</div>

              <div className="assignment-details">
                <h4>Database Assignment</h4>

                <span>Database Management</span>
              </div>

              <div className="assignment-date">
                <strong>Tomorrow</strong>
                <span>Sep 16</span>
              </div>
            </div>

            <div className="assignment-item">
              <div className="assignment-icon purple-assignment">DS</div>

              <div className="assignment-details">
                <h4>Array Problems</h4>

                <span>Data Structures</span>
              </div>

              <div className="assignment-date">
                <strong>Sep 18</strong>
                <span>2 days left</span>
              </div>
            </div>

            <div className="assignment-item">
              <div className="assignment-icon green-assignment">WD</div>

              <div className="assignment-details">
                <h4>React Mini Project</h4>

                <span>Web Development</span>
              </div>

              <div className="assignment-date">
                <strong>Sep 21</strong>
                <span>5 days left</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Your latest learning activity</p>
            </div>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot blue-dot"></div>

              <div className="activity-content">
                <h4>Completed a lesson</h4>

                <p>JavaScript Functions</p>

                <span>2 hours ago</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-dot green-dot"></div>

              <div className="activity-content">
                <h4>Assignment submitted</h4>

                <p>SQL Queries</p>

                <span>Yesterday</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-dot purple-dot"></div>

              <div className="activity-content">
                <h4>Started a new course</h4>

                <p>Data Structures</p>

                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardHome;
