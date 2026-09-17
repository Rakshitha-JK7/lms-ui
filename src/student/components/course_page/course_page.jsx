import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";

import { AccessCourses } from "../../../services/api.js";
import "./course_page.css";

const CourseContent = ()=>{
  const navigate =useNavigate();

  const [courses,setCourses] = useState([]);
  const [message,setMessage] = useState("");
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchCourses = async()=>{
      try{
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await AccessCourses(user.id);
        const data = response.data;

        setCourses(data.data || []);
        setMessage(data.message);
      }catch(error){
        console.log(error);

        setMessage(error.response?.data?.message|| "Failed to fetch courses");
      }finally{
        setLoading(false);
      }
    };

    fetchCourses();
  },[]);

  const handleCourse=(id)=>{
    navigate(`/StudentAssignments/${id}`);
  };

  
  if(loading){
    return(
      <main className="course-content-page">
        <div className="course-loading">
          Loading....
        </div>
      </main>
    );
  }

  return (
    <main className="course-content-page">

      <div className="course-content-heading">

        <p>MY COURSES</p>

        <h1>Course Content</h1>

        <span>
          Courses available for your department.
        </span>

      </div>


      {courses.length === 0 ? (

        <div className="course-empty">

          <BookOpen className="course-empty-icon" />

          <h2>No Courses available</h2>

          <p>
            There are currently no courses available for your department.
          </p>

        </div>

      ) : (

        <div className="course-content-list">

          {courses.map((courses) => (

            <div
              className="course-content-box"
              key={courses.id}
            >

              <div className="course-content-left">

                <div className="course-content-icon">
                  <BookOpen />
                </div>


                <div className="course-content-info">

                  <span className="course-code">
                    {courses.id}
                  </span>

                  <h2>
                    {courses.course_name}
                  </h2>

                  <p>
                    Course available for your department
                  </p>

                </div>

              </div>


              <button
                className="course-open-button"
                onClick={() => handleCourse(courses.id)}
              >

                Open

                <ChevronRight />

              </button>

            </div>

          ))}

        </div>
      )}
     </main>
  );
}

export default CourseContent;