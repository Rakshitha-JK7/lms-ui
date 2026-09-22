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

import "./AssignmentSubmissions.css";


const InstructorAssignmentSubmissions = () => {

  const { course_id, assignmentId } = useParams();

  const navigate = useNavigate();


  // ==========================================
  // STATE
  // ==========================================

  const [assignment, setAssignment] = useState(null);

  const [submissions, setSubmissions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedSubmission, setSelectedSubmission] =
    useState(null);


  // ==========================================
  // FETCH ASSIGNMENT + SUBMISSIONS
  // ==========================================

  useEffect(() => {

    if (course_id && assignmentId) {
      fetchAssignmentData();
    }

  }, [course_id, assignmentId]);


  const fetchAssignmentData = async () => {

    try {

      setLoading(true);
      setError("");


      console.log(
        "COURSE ID:",
        course_id
      );

      console.log(
        "ASSIGNMENT ID:",
        assignmentId
      );


      // --------------------------------------
      // GET ASSIGNMENT
      // --------------------------------------

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


      // --------------------------------------
      // GET SUBMISSIONS
      // --------------------------------------

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
        "ASSIGNMENT SUBMISSIONS ERROR:",
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
  // GET STUDENT NAME
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
  // OPEN SUBMISSION
  // ==========================================

  const openSubmission = (
    submission
  ) => {

    console.log(
      "SELECTED SUBMISSION:",
      submission
    );


    setSelectedSubmission(
      submission
    );

  };


  // ==========================================
  // CLOSE SUBMISSION
  // ==========================================

  const closeSubmission = () => {

    setSelectedSubmission(null);

  };

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
      {/* HEADER */}
      {/* ===================================== */}

      <div className="assignment-submissions-header">


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


        {assignment && (

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

        )}

      </div>


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


          <div className="assignment-details-top">

            <div>

              <h2>
                {assignment.title}
              </h2>


              <p className="assignment-description">

                {assignment.descriptions ||
                  "No description provided."}

              </p>

            </div>

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


            {/* MAX MARKS */}

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
              Click on a submission to view it.
            </p>

          </div>


          <div className="submission-total">

            <Users size={17} />

            {submissions.length} Submitted

          </div>


        </div>


        {/* NO SUBMISSIONS */}

        {submissions.length === 0 ? (

          <div className="no-submissions">

            <FileText size={42} />


            <h3>
              No submissions yet
            </h3>


            <p>

              Students have not submitted
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
                  onClick={() =>
                    openSubmission(
                      submission
                    )
                  }
                >


                  {/* ICON */}

                  <div className="submission-file-icon">

                    <FileText size={24} />

                  </div>


                  {/* STUDENT */}

                  <div className="submission-info">


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
                    onClick={(event) => {

                      event.stopPropagation();

                      openSubmission(
                        submission
                      );

                    }}
                  >

                    View

                  </button>


                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* ===================================== */}
      {/* SUBMISSION MODAL */}
      {/* ===================================== */}

      {selectedSubmission && (

        <div
          className="submission-modal-overlay"
          onClick={closeSubmission}
        >


          <div
            className="submission-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* ================================= */}
            {/* MODAL HEADER */}
            {/* ================================= */}

            <div className="submission-modal-header">


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
                className="close-modal-button"
                onClick={closeSubmission}
              >

                <X size={22} />

              </button>


            </div>


            {/* ================================= */}
            {/* MODAL CONTENT */}
            {/* ================================= */}

            <div className="submission-modal-content">


              {/* ================================= */}
              {/* STUDENT ANSWER */}
              {/* ================================= */}

              <div className="submitted-file-section">


                <div className="submitted-file-header">

                  <h3>
                    Submitted Assignment
                  </h3>

                </div>


                {selectedSubmission.file_url ? (

                  <div className="submitted-answer">

                    <p>
                      {selectedSubmission.file_url}
                    </p>

                  </div>

                ) : (

                  <div className="no-file">

                    <FileText size={40} />

                    <p>
                      No answer was submitted.
                    </p>

                  </div>

                )}

              </div>


              {/* ================================= */}
              {/* GRADE */}
              {/* ================================= */}

              <div className="grading-section">


                <div className="grading-field">

                  <label>
                    Grade
                  </label>


                  <input
                    type="number"
                    min="0"
                    max={
                      assignment?.max_marks
                    }
                    value={
                      selectedSubmission.grade ?? ""
                    }
                    readOnly
                  />

                </div>


                {/* ================================= */}
                {/* FEEDBACK */}
                {/* ================================= */}

                <div className="grading-field">

                  <label>
                    Feedback
                  </label>


                  <textarea
                    value={
                      selectedSubmission.feedback ||
                      ""
                    }
                    readOnly
                    placeholder="No feedback provided."
                  />

                </div>


              </div>


            </div>


          </div>

        </div>

      )}

    </div>

  );

};


export default InstructorAssignmentSubmissions;