import "./home_page.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AccessCourses } from "../../../services/api";

const DashboardHome = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER:", user);
  console.log("USER ID:", user?.id);

  const handleView = () => {
    navigate("/Courses");
  };

  const handleOpenCourse = (id) => {
    navigate(`/StudentAssignments/${id}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {

        const response = await AccessCourses(user.id);

        const data = response.data;

        if (data.status) {
          setCourses(data.data || []);
          setMessage(data.message || "");
        } else {
          setMessage(data.message || "Failed to fetch courses");
        }
      } catch (error) {
        console.log(error);

        setMessage(
          error.response?.data?.message || "Fetch Failed!!!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="dashboard-home">

      <section className="welcome-card">

        <div className="welcome-content">
          <span className="welcome-tag">
            STUDENT DASHBOARD
          </span>

          <h1>
            Welcome back, {user?.fname || "Student"}!
          </h1>

          <p>
            Continue your learning journey and keep making progress.
          </p>
        </div>

        <div className="welcome-illustration">
          <div className="welcome-circle">
            🎓
          </div>
        </div>

      </section>
      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            📚
          </div>

          <div className="stat-content">
            <span>Total Courses</span>

            <h2>
              {courses.length}
            </h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon purple">
            ◔
          </div>

          <div className="stat-content">
            <span>Overall Progress</span>

            <h2>
              72%
            </h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon orange">
            ✓
          </div>

          <div className="stat-content">
            <span>Assignments</span>

            <h2>
              4
            </h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon green">
            ◈
          </div>

          <div className="stat-content">
            <span>Upcoming Exams</span>

            <h2>
              2
            </h2>
          </div>
        </div>

      </section>
      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>
              My Courses
            </h2>

            <p>
              Courses available for your department
            </p>
          </div>

          <button
            className="view-all-btn"
            onClick={handleView}
          >
            View all
            <span>→</span>
          </button>

        </div>


        <div className="course-grid">

          {loading ? (

            <p>
              Loading courses...
            </p>

          ) : courses.length === 0 ? (

            <p>
              {message || "No Courses available"}
            </p>

          ) : (

            courses.slice(0, 3).map((course) => (

              <div
                className="course-card"
                key={course.id}
              >

                <div className="course-card-top">

                  <div className="course-logo">
                    {course.course_number};
                  </div>

                </div>


                <h3>
                  {course.course_name}
                </h3>


                <p>
                  Course ID: {course.id}
                </p>


                <button
                  className="open-course-btn"
                  onClick={() =>
                    handleOpenCourse(course.id)
                  }
                >
                  Open Course
                  <span>→</span>
                </button>

              </div>

            ))

          )}

        </div>

      </section>

      <section className="bottom-grid">


        <div className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h2>
                Upcoming Assignments
              </h2>

              <p>
                Don't miss your deadlines
              </p>
            </div>

            <button className="small-view-btn">
              View all
            </button>

          </div>


          <div className="assignment-list">

            <div className="assignment-item">

              <div className="assignment-icon">
                DB
              </div>

              <div className="assignment-details">

                <h4>
                  Database Assignment
                </h4>

                <span>
                  Database Management
                </span>

              </div>

              <div className="assignment-date">

                <strong>
                  Tomorrow
                </strong>

                <span>
                  Sep 16
                </span>

              </div>

            </div>


            <div className="assignment-item">

              <div className="assignment-icon purple-assignment">
                DS
              </div>

              <div className="assignment-details">

                <h4>
                  Array Problems
                </h4>

                <span>
                  Data Structures
                </span>

              </div>

              <div className="assignment-date">

                <strong>
                  Sep 18
                </strong>

                <span>
                  2 days left
                </span>

              </div>

            </div>


            <div className="assignment-item">

              <div className="assignment-icon green-assignment">
                WD
              </div>

              <div className="assignment-details">

                <h4>
                  React Mini Project
                </h4>

                <span>
                  Web Development
                </span>

              </div>

              <div className="assignment-date">

                <strong>
                  Sep 21
                </strong>

                <span>
                  5 days left
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <h2>
                Recent Activity
              </h2>

              <p>
                Your latest learning activity
              </p>
            </div>

          </div>


          <div className="activity-list">

            <div className="activity-item">

              <div className="activity-dot blue-dot"></div>

              <div className="activity-content">

                <h4>
                  Completed a lesson
                </h4>

                <p>
                  JavaScript Functions
                </p>

                <span>
                  2 hours ago
                </span>

              </div>

            </div>


            <div className="activity-item">

              <div className="activity-dot green-dot"></div>

              <div className="activity-content">

                <h4>
                  Assignment submitted
                </h4>

                <p>
                  SQL Queries
                </p>

                <span>
                  Yesterday
                </span>

              </div>

            </div>


            <div className="activity-item">

              <div className="activity-dot purple-dot"></div>

              <div className="activity-content">

                <h4>
                  Started a new course
                </h4>

                <p>
                  Data Structures
                </p>

                <span>
                  2 days ago
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default DashboardHome;