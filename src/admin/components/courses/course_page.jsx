import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AdminCourses as getAdminCourses,
  CreateCourse
} from "../../../services/api";

import {
  Plus,
  X
} from "lucide-react";

import "./course_page.css";


const AdminCourses = () => {

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const [message, setMessage] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [courseData, setCourseData] = useState({
    course_number: "",
    course_name: "",
    dept_id: ""
  });


  useEffect(() => {
    getCourses();
  }, []);


  const getCourses = async () => {

    try {

      const response = await getAdminCourses();

      console.log("ADMIN COURSES:", response.data);

      if (response.data.status) {

        setCourses(response.data.data || []);

      } else {

        setCourses([]);

        setMessage(
          response.data.message || "Failed to fetch courses"
        );

      }

    } catch (error) {

      console.error("FETCH ADMIN COURSES ERROR:", error);

      console.error(
        "Backend response:",
        error.response?.data
      );

      setCourses([]);

      setMessage(
        error.response?.data?.message ||
        "Failed to fetch courses"
      );
    }
  };


  const handleCreateCourse = () => {

    setShowCreateModal(true);

    setMessage("");
  };


  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setCourseData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };


  const handleCloseModal = () => {

    setShowCreateModal(false);

    setCourseData({
      course_number: "",
      course_name: "",
      dept_id: ""
    });
  };


  /* =========================
     SUBMIT COURSE
  ========================= */

  const handleSubmitCourse = async (e) => {

    e.preventDefault();

    try {


      const storedUser = localStorage.getItem("user");

      if (!storedUser) {

        setMessage("User information not found");

        return;
      }


      const user = JSON.parse(storedUser);


      if (!user.id) {

        setMessage("Admin ID not found");

        return;
      }

      if (
        !courseData.course_number ||
        !courseData.course_name ||
        !courseData.dept_id
      ) {

        setMessage("Please fill all fields");

        return;
      }


      console.log("Creating course:");

      console.log({
        instructor_id: user.id,
        dept_id: courseData.dept_id,
        course_name: courseData.course_name,
        course_number: courseData.course_number
      });

      const response = await CreateCourse(
        user.id,
        courseData.dept_id,
        courseData.course_name,
        courseData.course_number
      );


      console.log(
        "CREATE COURSE RESPONSE:",
        response.data
      );


      const data = response.data;


      if (data.status) {

        setMessage("Course created successfully");

        handleCloseModal();

        await getCourses();

      } else {

        setMessage(
          data.message ||
          "Failed to create course"
        );
      }


    } catch (error) {

      console.error(
        "CREATE COURSE ERROR:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );


      setMessage(
        error.response?.data?.message ||
        "Failed to create course"
      );
    }
  };

  const departments = {};


  courses.forEach((course) => {

    if (!departments[course.dept_name]) {

      departments[course.dept_name] = [];

    }

    departments[course.dept_name].push(course);

  });


  return (

    <div className="admin-courses-content">


      <div className="course-top">

        <div className="course-heading">

          <p className="course-label">
            ADMIN COURSES
          </p>

          <h1>
            Courses
          </h1>

          <span>
            Courses available under different departments
          </span>

        </div>


        <button
          type="button"
          className="create-course-button"
          onClick={handleCreateCourse}
        >

          <Plus size={18} />

          <span>
            Create
          </span>

        </button>

      </div>


      {message && (

        <div className="course-message">

          {message}

        </div>

      )}


      {courses.length === 0 ? (

        <div className="course-empty">

          <h2>
            No Courses Available
          </h2>

          <p>
            No courses have been added yet.
          </p>

        </div>

      ) : (


        Object.keys(departments).map((department) => (

          <div
            className="department-section"
            key={department}
          >


            <div className="department-title">

              <div>

                <h2>
                  {department}
                </h2>

              </div>

              <span>
                {departments[department].length} Courses
              </span>

            </div>


            <div className="courses-grid">

              {departments[department].map((course) => (

                <div
                  className="course-card"
                  key={course.id || course.course_id}
                >

                  <h3>
                    {course.course_name}
                  </h3>


                  <p>
                    Course ID:{" "}
                    {course.course_number ||
                      course.course_id}
                  </p>


                  <p>
                    Department:{" "}
                    {course.dept_name}
                  </p>

                  <button
                      type="button"
                      className="course-open-button"
                      onClick={() => {
                        console.log("CLICKED COURSE:", course);

                        navigate(
                          `/AdminAssignment/${course.id || course. course_id}`
                        );
                       }}
                      >
                      View Assignments
                    </button>

                </div>

              ))}

            </div>

          </div>

        ))

      )}


      {showCreateModal && (

        <div
          className="course-modal-overlay"
          onClick={handleCloseModal}
        >


          <div
            className="course-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="course-modal-header">

              <div>

                <h2>
                  Create Course
                </h2>

                <p>
                  Add a new course to your department.
                </p>

              </div>


              <button
                type="button"
                className="course-modal-close"
                onClick={handleCloseModal}
              >

                <X size={20} />

              </button>

            </div>
            <form onSubmit={handleSubmitCourse}>


              <div className="course-form-group">

                <label>
                  Course ID
                </label>

                <input
                  type="text"
                  name="course_number"
                  value={courseData.course_number}
                  onChange={handleInputChange}
                  placeholder="Example: BCS301"
                  required
                />

              </div>

              <div className="course-form-group">

                <label>
                  Course Name
                </label>

                <input
                  type="text"
                  name="course_name"
                  value={courseData.course_name}
                  onChange={handleInputChange}
                  placeholder="Example: Database Management Systems"
                  required
                />

              </div>


              <div className="course-form-group">

                <label>
                  Department
                </label>

                <select
                  name="dept_id"
                  value={courseData.dept_id}
                  onChange={handleInputChange}
                  required
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="1">
                    Computer Science & Engineering
                  </option>

                  <option value="2">
                    Information Science & Engineering
                  </option>

                  <option value="3">
                    Electronics & Communication Engineering
                  </option>

                  <option value="4">
                    Electrical & Electronics Engineering
                  </option>

                </select>

              </div>


              <div className="course-modal-actions">


                <button
                  type="button"
                  className="course-cancel-button"
                  onClick={handleCloseModal}
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="course-submit-button"
                >

                  <Plus size={17} />

                  Create Course

                </button>

              </div>


            </form>

          </div>

        </div>

      )}

    </div>

  );
};


export default AdminCourses;