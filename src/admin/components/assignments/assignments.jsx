import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAssignments
} from "../../../services/api.js";

import {
  FileText,
  Users,
  Calendar,
  ArrowLeft
} from "lucide-react";

import "./assignments.css";


const AdminAssignment = () => {

  const { course_id } = useParams();

  const navigate = useNavigate();


  const [assignments, setAssignments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");


  // ==========================================
  // FETCH ASSIGNMENTS
  // ==========================================

  useEffect(() => {

    if (course_id) {

      fetchAssignments();

    }

  }, [course_id]);


  const fetchAssignments = async () => {

    try {

      setLoading(true);

      setMessage("");


      console.log(
        "ADMIN - FETCHING ASSIGNMENTS"
      );

      console.log(
        "COURSE ID:",
        course_id
      );


      const response =
        await getAssignments(course_id);


      console.log(
        "ADMIN ASSIGNMENTS RESPONSE:",
        response.data
      );


      if (response.data.status) {

        setAssignments(
          response.data.data || []
        );

      } else {

        setAssignments([]);

        setMessage(
          response.data.message ||
          "No assignments found"
        );

      }

    } catch (error) {

      console.error(
        "ADMIN ASSIGNMENTS ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error.response?.data
      );


      setMessage(
        error.response?.data?.message ||
        "Failed to fetch assignments"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    if (!date) {

      return "-";

    }


    const parsedDate =
      new Date(date);


    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

      return "-";

    }


    return parsedDate.toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }
    );

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="admin-assignment-page">

        <div className="admin-assignment-loading">

          Loading assignments...

        </div>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="admin-assignment-page">


      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="admin-assignment-header">


        <button
          type="button"
          className="admin-back-button"
          onClick={() =>
            navigate("/AdminCoursePage")
          }
        >

          <ArrowLeft size={18} />

          Back to Courses

        </button>


        <div className="admin-assignment-title">

          <div className="admin-assignment-icon">

            <FileText size={28} />

          </div>


          <div>

            <h1>
              Assignments
            </h1>

            <p>
              Course ID: {course_id}
            </p>

          </div>

        </div>

      </div>


      {/* ====================================== */}
      {/* MESSAGE */}
      {/* ====================================== */}

      {message && (

        <div className="admin-assignment-message">

          {message}

        </div>

      )}


      {/* ====================================== */}
      {/* NO ASSIGNMENTS */}
      {/* ====================================== */}

      {assignments.length === 0 ? (

        <div className="admin-no-assignments">

          <FileText size={48} />

          <h2>
            No Assignments
          </h2>

          <p>
            No assignments have been created
            for this course yet.
          </p>

        </div>

      ) : (


        /* ==================================== */
        /* ASSIGNMENT LIST */
        /* ==================================== */

        <div className="admin-assignment-list">

          {assignments.map(
            (assignment) => (

              <div
                className="admin-assignment-card"
                key={assignment.id}
              >


                {/* ============================ */}
                {/* HEADER */}
                {/* ============================ */}

                <div className="admin-assignment-card-header">

                  <div className="admin-assignment-card-title">

                    <div className="admin-card-icon">

                      <FileText size={22} />

                    </div>


                    <div>

                      <h2>
                        {assignment.title}
                      </h2>

                      <p>
                        Assignment #{assignment.id}
                      </p>

                    </div>

                  </div>


                  <div className="admin-assignment-marks">

                    {assignment.max_marks}

                    {" "}

                    Marks

                  </div>

                </div>


                {/* ============================ */}
                {/* DESCRIPTION */}
                {/* ============================ */}

                <div className="admin-assignment-description">

                  <p>

                    {assignment.descriptions ||
                      "No description provided."}

                  </p>

                </div>


                {/* ============================ */}
                {/* INFORMATION */}
                {/* ============================ */}

                <div className="admin-assignment-info">


                  <div className="admin-info-item">

                    <Calendar size={17} />

                    <div>

                      <span>
                        Due Date
                      </span>

                      <strong>

                        {formatDate(
                          assignment.due_date
                        )}

                      </strong>

                    </div>

                  </div>


                  <div className="admin-info-item">

                    <FileText size={17} />

                    <div>

                      <span>
                        Maximum Marks
                      </span>

                      <strong>

                        {assignment.max_marks}

                      </strong>

                    </div>

                  </div>


                </div>


                {/* ============================ */}
                {/* ACTION */}
                {/* ============================ */}

                <div className="admin-assignment-actions">

                  <button
                    type="button"
                    className="admin-view-submissions-button"
                    onClick={() =>
                      navigate(
                        `/AdminAssignment/${course_id}/${assignment.id}/submissions`
                      )
                    }
                  >

                    <Users size={17} />

                    View Submissions

                  </button>

                </div>


              </div>

            )
          )}

        </div>

      )}

    </div>

  );

};


export default AdminAssignment;