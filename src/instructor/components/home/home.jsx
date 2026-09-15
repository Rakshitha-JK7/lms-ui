import "./home.css";
import {
  BookOpen,
  FileText,
  ClipboardList,
  BarChart3,
  Users,
  Clock
} from "lucide-react";

const InstructorHomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className="instructor-home">

      <section className="instructor-welcome">
        <div>
          <p className="instructor-welcome-label">INSTRUCTOR DASHBOARD</p>

          <h1>
            Welcome back, {user?.fname || "Instructor"}
          </h1>

          <p>
            Manage your courses, exams and track your teaching activity.
          </p>
        </div>
      </section>

      <section className="instructor-stats">

        <div className="instructor-stat-card">
          <div className="instructor-stat-icon">
            <BookOpen />
          </div>

          <div>
            <p>My Courses</p>
            <h2>6</h2>
          </div>
        </div>


        <div className="instructor-stat-card">
          <div className="instructor-stat-icon">
            <Users />
          </div>

          <div>
            <p>Total Students</p>
            <h2>184</h2>
          </div>
        </div>


        <div className="instructor-stat-card">
          <div className="instructor-stat-icon">
            <ClipboardList />
          </div>

          <div>
            <p>Assignments</p>
            <h2>12</h2>
          </div>
        </div>


        <div className="instructor-stat-card">
          <div className="instructor-stat-icon">
            <FileText />
          </div>

          <div>
            <p>Exams</p>
            <h2>4</h2>
          </div>
        </div>

      </section>

      <section className="instructor-content-grid">

        <div className="instructor-card">

          <div className="instructor-card-header">
            <div>
              <h2>My Courses</h2>
              <p>Courses currently assigned to you</p>
            </div>

            <button>View All</button>
          </div>


          <div className="instructor-course-list">

            <div className="instructor-course">
              <div className="course-icon">
                <BookOpen />
              </div>

              <div className="course-info">
                <h3>Web Development</h3>
                <p>42 Students</p>
              </div>

              <span className="course-status">Active</span>
            </div>


            <div className="instructor-course">
              <div className="course-icon">
                <BookOpen />
              </div>

              <div className="course-info">
                <h3>Database Management</h3>
                <p>35 Students</p>
              </div>

              <span className="course-status">Active</span>
            </div>


            <div className="instructor-course">
              <div className="course-icon">
                <BookOpen />
              </div>

              <div className="course-info">
                <h3>Operating Systems</h3>
                <p>51 Students</p>
              </div>

              <span className="course-status">Active</span>
            </div>


            <div className="instructor-course">
              <div className="course-icon">
                <BookOpen />
              </div>

              <div className="course-info">
                <h3>Computer Networks</h3>
                <p>56 Students</p>
              </div>

              <span className="course-status">Active</span>
            </div>

          </div>

        </div>

        <div className="instructor-card">

          <div className="instructor-card-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Your latest activities</p>
            </div>
          </div>


          <div className="instructor-activity-list">

            <div className="instructor-activity">
              <div className="activity-icon">
                <FileText />
              </div>

              <div>
                <h3>New exam created</h3>
                <p>Database Management</p>
                <span>2 hours ago</span>
              </div>
            </div>


            <div className="instructor-activity">
              <div className="activity-icon">
                <ClipboardList />
              </div>

              <div>
                <h3>Assignment published</h3>
                <p>Web Development</p>
                <span>Yesterday</span>
              </div>
            </div>


            <div className="instructor-activity">
              <div className="activity-icon">
                <BarChart3 />
              </div>

              <div>
                <h3>Course report generated</h3>
                <p>Operating Systems</p>
                <span>2 days ago</span>
              </div>
            </div>


            <div className="instructor-activity">
              <div className="activity-icon">
                <Clock />
              </div>

              <div>
                <h3>Course updated</h3>
                <p>Computer Networks</p>
                <span>3 days ago</span>
              </div>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default InstructorHomePage;