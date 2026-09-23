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
  Calendar,
  X
} from "lucide-react";

import "./adminsubmissions.css";


const AdminSubmissions = () => {

  const {
    course_id,
    assignmentId
  } = useParams();

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

  const [selectedSubmission, setSelectedSubmission] =
    useState(null);


  // ==========================================
  // FETCH DATA
  // ==========================================

  useEffect(() => {

    console.log(
      "ADMIN SUBMISSION PAGE PARAMS:",
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
        "ADMIN - GETTING ASSIGNMENT:",
        course_id,
        assignmentId
      );


      const assignmentResponse =
        await getSingleAssignment(
          course_id,
          assignmentId
        );


      console.log(
        "ADMIN ASSIGNMENT RESPONSE:",
        assignmentResponse.data
      );


      if (
        assignmentResponse.data.status
      ) {

        setAssignment(
          assignmentResponse.data.data
        );

      } else {

        setError(
          assignmentResponse.data.message ||
          "Failed to load assignment."
        );

      }


      // ======================================
      // GET SUBMISSIONS
      // ======================================

      console.log(
        "ADMIN - GETTING SUBMISSIONS:",
        course_id,
        assignmentId
      );


      const submissionsResponse =
        await getAssignmentSubmissions(
          course_id,
          assignmentId
        );


      console.log(
        "ADMIN SUBMISSIONS RESPONSE:",
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
        "ADMIN ASSIGNMENT SUBMISSIONS ERROR:",
        error
      );


      console.error(
        "BACKEND RESPONSE:",
        error.response?.data
      );


      setError(
        error.response?.data?.message ||
        "Failed to load assignment submissions."
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
        second: "2-digit",
        hour12: true
      }
    );

  };


  // ==========================================
  // STUDENT NAME
  // ==========================================

  const getStudentName = (
    submission
  ) => {

    const firstName =
      submission.fname || "";

    const lastName =
      submission.lname || "";


    const fullName =
      `${firstName} ${lastName}`.trim();


    if (fullName) {

      return fullName;

    }


    return `Student #${submission.student_id}`;

  };


  // ==========================================
  // VIEW SUBMISSION
  // ==========================================

  const handleViewSubmission = (
    submission
  ) => {

    console.log(
      "ADMIN SELECTED SUBMISSION:",
      submission
    );


    setSelectedSubmission(
      submission
    );

  };


  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const handleCloseModal = () => {

    setSelectedSubmission(null);

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="admin-submissions-page">

        <div className="admin-submissions-loading">

          Loading submissions...

        </div>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="admin-submissions-page">


      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="admin-submissions-header">


        <button
          type="button"
          className="admin-submissions-back-button"
          onClick={() =>
            navigate(
              `/AdminAssignment/${course_id}`
            )
          }
        >

          <ArrowLeft size={18} />

          Back to Assignments

        </button>


        {assignment && (

          <div className="admin-submissions-title">

            <div className="admin-submissions-title-icon">

              <FileText size={28} />

            </div>


            <div>

              <h1>
                {assignment.title}
              </h1>

              <p>
                Assignment Submissions
              </p>

            </div>

          </div>

        )}

      </div>


      {/* ====================================== */}
      {/* ERROR */}
      {/* ====================================== */}

      {error && (

        <div className="admin-submissions-error">

          {error}

        </div>

      )}


      {/* ====================================== */}
      {/* ASSIGNMENT DETAILS */}
      {/* ====================================== */}

      {assignment && (

        <div className="admin-assignment-details-card">


          <div className="admin-assignment-description">

            <h3>
              Description
            </h3>

            <p>

              {assignment.descriptions ||
                "No description provided."}

            </p>

          </div>


          <div className="admin-assignment-meta">


            {/* DUE DATE */}

            <div className="admin-assignment-meta-item">

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

            <div className="admin-assignment-meta-item">

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

            <div className="admin-assignment-meta-item">

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


      {/* ====================================== */}
      {/* SUBMISSION SECTION */}
      {/* ====================================== */}

      <div className="admin-submissions-section">


        <div className="admin-submissions-section-header">

          <div>

            <h2>
              Student Submissions
            </h2>

            <p>
              View the answers submitted by students.
            </p>

          </div>


          <div className="admin-submission-count">

            <Users size={17} />

            {submissions.length} Submitted

          </div>

        </div>


        {/* ==================================== */}
        {/* NO SUBMISSIONS */}
        {/* ==================================== */}

        {submissions.length === 0 ? (

          <div className="admin-no-submissions">

            <FileText size={45} />

            <h3>
              No Submissions
            </h3>

            <p>
              No students have submitted
              this assignment yet.
            </p>

          </div>

        ) : (


          /* ================================== */
          /* SUBMISSIONS */
          /* ================================== */

          <div className="admin-submissions-list">

            {submissions.map(
              (submission) => (

                <div
                  className="admin-submission-card"
                  key={submission.id}
                >


                  {/* ICON */}

                  <div className="admin-submission-icon">

                    <FileText size={24} />

                  </div>


                  {/* STUDENT */}

                  <div className="admin-submission-student">

                    <h3>

                      {getStudentName(
                        submission
                      )}

                    </h3>


                    <p>

                      Submitted on{" "}

                      {formatDate(
                        submission.submitted_at
                      )}

                    </p>

                  </div>


                  {/* GRADE */}

                  <div className="admin-submission-grade">

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

                      <strong className="admin-not-graded">

                        Not graded

                      </strong>

                    )}

                  </div>


                  {/* VIEW */}

                  <button
                    type="button"
                    className="admin-view-submission-button"
                    onClick={() =>
                      handleViewSubmission(
                        submission
                      )
                    }
                  >

                    View

                  </button>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* ====================================== */}
      {/* SUBMISSION MODAL */}
      {/* ====================================== */}

      {selectedSubmission && (

        <div
          className="admin-submission-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="admin-submission-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* ================================= */}
            {/* MODAL HEADER */}
            {/* ================================= */}

            <div className="admin-modal-header">

              <div>

                <h2>

                  {getStudentName(
                    selectedSubmission
                  )}

                </h2>


                <p>

                  Submitted on{" "}

                  {formatDate(
                    selectedSubmission.submitted_at
                  )}

                </p>

              </div>


              <button
                type="button"
                className="admin-close-modal-button"
                onClick={
                  handleCloseModal
                }
              >

                <X size={23} />

              </button>

            </div>


            {/* ================================= */}
            {/* ANSWER */}
            {/* ================================= */}

            <div className="admin-answer-section">

              <h3>
                Student Answer
              </h3>


              <div className="admin-answer-box">

                {selectedSubmission.file_url ? (

                  <p>
                    {selectedSubmission.file_url}
                  </p>

                ) : (

                  <p className="admin-no-answer">

                    No answer submitted.

                  </p>

                )}

              </div>

            </div>


            {/* ================================= */}
            {/* GRADE */}
            {/* ================================= */}

            <div className="admin-grade-section">

              <h3>
                Grade
              </h3>


              {selectedSubmission.grade !== null &&
              selectedSubmission.grade !== undefined &&
              selectedSubmission.grade !== "" ? (

                <p className="admin-grade-value">

                  {selectedSubmission.grade}

                  {" / "}

                  {assignment?.max_marks}

                </p>

              ) : (

                <p className="admin-not-graded">

                  Not graded

                </p>

              )}

            </div>


            {/* ================================= */}
            {/* FEEDBACK */}
            {/* ================================= */}

            <div className="admin-feedback-section">

              <h3>
                Feedback
              </h3>


              {selectedSubmission.feedback ? (

                <p className="admin-feedback-text">

                  {selectedSubmission.feedback}

                </p>

              ) : (

                <p className="admin-no-feedback">

                  No feedback provided.

                </p>

              )}

            </div>


          </div>

        </div>

      )}

    </div>

  );

};


export default AdminSubmissions;