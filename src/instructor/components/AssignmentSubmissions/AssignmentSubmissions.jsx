import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getSingleAssignment,
  getAssignmentSubmissions
} from "../../../services/api.js";

import {
  ArrowLeft,
  FileText,
  Users,
  Calendar
} from "lucide-react";

import "./AssignmentSubmissions.css";


const InstructorAssignmentSubmissions = () => {

  const { course_id, assignmentId } = useParams();

  const navigate = useNavigate();


  // ==========================================
  // STATE
  // ==========================================

  const [assignment, setAssignment] =
    useState(null);

  const [submissions, setSubmissions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==========================================
  // FETCH DATA
  // ==========================================

  useEffect(() => {

    console.log(
      "ROUTE PARAMS:",
      {
        course_id,
        assignmentId
      }
    );

    if (
      course_id &&
      assignmentId
    ) {

      fetchAssignmentData();

    }

  }, [
    course_id,
    assignmentId
  ]);


  const fetchAssignmentData = async () => {

    try {

      setLoading(true);

      setError("");


      // ======================================
      // GET ASSIGNMENT
      // ======================================

      console.log(
        "GETTING ASSIGNMENT:",
        course_id,
        assignmentId
      );


      const assignmentResponse =
        await getSingleAssignment(
          course_id,
          assignmentId
        );


      console.log(
        "ASSIGNMENT RESPONSE:",
        assignmentResponse.data
      );


      if (
        assignmentResponse.data.status
      ) {

        setAssignment(
          assignmentResponse.data.data
        );

      }


      // ======================================
      // GET SUBMISSIONS
      // ======================================

      console.log(
        "GETTING SUBMISSIONS:",
        course_id,
        assignmentId
      );


      const submissionsResponse =
        await getAssignmentSubmissions(
          course_id,
          assignmentId
        );


      console.log(
        "SUBMISSIONS RESPONSE:",
        submissionsResponse.data
      );


      if (
        submissionsResponse.data.status
      ) {

        setSubmissions(
          submissionsResponse.data.data || []
        );

      } else {

        setSubmissions([]);

      }


    } catch (error) {

      console.error(
        "ASSIGNMENT PAGE ERROR:",
        error
      );


      console.error(
        "BACKEND RESPONSE:",
        error.response?.data
      );


      setError(
        error.response?.data?.message ||
        "Failed to load assignment."
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

      <div className="assignment-submissions-page">

        <div className="assignment-loading">

          Loading assignment...

        </div>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="assignment-submissions-page">


      {/* ===================================== */}
      {/* BACK BUTTON */}
      {/* ===================================== */}

      <button
        type="button"
        className="back-button"
        onClick={() =>
          navigate(
            `/InstructorAssignment/${course_id}`
          )
        }
      >

        <ArrowLeft size={18} />

        Back to Assignments

      </button>


      {/* ===================================== */}
      {/* ERROR */}
      {/* ===================================== */}

      {error && (

        <div className="assignment-error">

          {error}

        </div>

      )}


      {/* ===================================== */}
      {/* ASSIGNMENT DETAILS */}
      {/* ===================================== */}

      {assignment && (

        <div className="assignment-details-card">

          <div className="assignment-heading">

            <div className="assignment-heading-icon">

              <FileText size={28} />

            </div>


            <div>

              <h1>
                {assignment.title}
              </h1>

              <p>
                Assignment submissions
              </p>

            </div>

          </div>


          <div className="assignment-description">

            {assignment.descriptions ||
              "No description provided."}

          </div>


          <div className="assignment-meta">


            {/* DUE DATE */}

            <div className="assignment-meta-item">

              <Calendar size={18} />

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


            {/* MARKS */}

            <div className="assignment-meta-item">

              <FileText size={18} />

              <div>

                <span>
                  Maximum Marks
                </span>

                <strong>

                  {assignment.max_marks}

                </strong>

              </div>

            </div>


            {/* SUBMISSIONS */}

            <div className="assignment-meta-item">

              <Users size={18} />

              <div>

                <span>
                  Submissions
                </span>

                <strong>

                  {submissions.length}

                </strong>

              </div>

            </div>


          </div>

        </div>

      )}


      {/* ===================================== */}
      {/* SUBMISSIONS */}
      {/* ===================================== */}

      <div className="submissions-section">


        <div className="submissions-section-header">

          <div>

            <h2>
              Student Submissions
            </h2>

            <p>
              Students who submitted this assignment
            </p>

          </div>


          <div className="submission-total">

            <Users size={17} />

            {submissions.length} Submitted

          </div>

        </div>


        {/* =================================== */}
        {/* NO SUBMISSIONS */}
        {/* =================================== */}

        {submissions.length === 0 ? (

          <div className="no-submissions">

            <FileText size={42} />

            <h3>
              No Submissions
            </h3>

            <p>
              No students have submitted
              this assignment yet.
            </p>

          </div>

        ) : (


          /* ================================= */
          /* SUBMISSION LIST */
          /* ================================= */

          <div className="submissions-list">

            {submissions.map(
              (submission) => (

                <div
                  className="submission-card"
                  key={submission.id}
                >


                  {/* ICON */}

                  <div className="submission-file-icon">

                    <FileText size={24} />

                  </div>


                  {/* STUDENT */}

                  <div className="submission-info">

                    <h3>

                      {submission.fname ||
                       submission.lname
                        ? `${submission.fname || ""} ${submission.lname || ""}`.trim()
                        : `Student #${submission.student_id}`}

                    </h3>


                    <p>

                      Submitted on{" "}

                      {formatDate(
                        submission.submitted_at
                      )}

                    </p>

                  </div>


                  {/* GRADE */}

                  <div className="submission-grade">

                    <span>
                      Grade
                    </span>


                    {submission.grade !== null &&
                    submission.grade !== undefined &&
                    submission.grade !== "" ? (

                      <strong>

                        {submission.grade}/
                        {assignment?.max_marks}

                      </strong>

                    ) : (

                      <strong>
                        Not graded
                      </strong>

                    )}

                  </div>


                  {/* VIEW */}

                  <button
                    type="button"
                    className="view-submission-button"
                  >

                    View

                  </button>


                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

};


export default InstructorAssignmentSubmissions;