import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getAssignments,
  submitAssignment
} from "../../../services/api.js";

import "./assignment.css";

const StudentAssignment = () => {
  const { course_id } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        "FETCHING ASSIGNMENTS FOR COURSE:",
        course_id
      );

      const response = await getAssignments(course_id);

      console.log(
        "ASSIGNMENTS RESPONSE:",
        response.data
      );

      if (response.data.status) {
        setAssignments(response.data.data || []);
      } else {
        setAssignments([]);

        setMessage(
          response.data.message ||
            "No assignments available"
        );
      }

    } catch (error) {

      console.error(
        "FETCH ASSIGNMENTS ERROR:",
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

  const handleSubmit = async () => {

    if (!selectedAssignment) {
      setMessage("Please select an assignment");
      return;
    }

    if (!answer.trim()) {
      setMessage("Please enter your answer");
      return;
    }

    try {

      setSubmitting(true);
      setMessage("");

      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        setMessage(
          "Student information not found"
        );
        return;
      }

      const user = JSON.parse(storedUser);

      if (!user.id) {
        setMessage("Student ID not found");
        return;
      }

      console.log(
        "SUBMITTING ASSIGNMENT"
      );

      console.log(
        "Student ID:",
        user.fname ,user.lname
      );

      console.log(
        "Assignment ID:",
        selectedAssignment.id
      );

      console.log(
        "Answer:",
        answer
      );

      const response =
        await submitAssignment(
          user.id,
          selectedAssignment.id,
          answer
        );

      console.log(
        "SUBMISSION RESPONSE:",
        response.data
      );

      if (response.data.status) {

        setMessage(
          "Assignment submitted successfully"
        );

        setSelectedAssignment(null);
        setAnswer("");

      } else {

        setMessage(
          response.data.message ||
            "Failed to submit assignment"
        );

      }

    } catch (error) {

      console.error(
        "SUBMIT ASSIGNMENT ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error.response?.data
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to submit assignment"
      );

    } finally {

      setSubmitting(false);

    }
  };

  const handleCloseModal = () => {
    setSelectedAssignment(null);
    setAnswer("");
    setMessage("");
  };

  const formatDate = (date) => {

    if (!date) {
      return "Not specified";
    }

    return new Date(date).toLocaleString();
  };

  if (loading) {

    return (
      <div className="student-assignment-page">

        <div className="assignment-loading">
          Loading assignments...
        </div>

      </div>
    );
  }

  return (
    <div className="student-assignment-page">

      <div className="assignment-header">

        <h1>Assignments</h1>

        <p>
          Course ID: {course_id}
        </p>

      </div>

      {message && (
        <div className="assignment-message">
          {message}
        </div>
      )}


      {assignments.length === 0 ? (

        <div className="no-assignments">

          <h3>
            No Assignments Available
          </h3>

          <p>
            Your instructor has not posted
            any assignments for this course yet.
          </p>

        </div>

      ) : (

        <div className="assignments-list">

          {assignments.map((assignment) => (

            <div
              className="student-assignment-card"
              key={assignment.id}
            >

              <div className="assignment-card-header">

                <h2>
                  {assignment.title}
                </h2>

                <span className="assignment-marks">
                  {assignment.max_marks} Marks
                </span>

              </div>


              <div className="assignment-description">

                <p>
                  {assignment.descriptions}
                </p>

              </div>


              <div className="assignment-info">

                <div>

                  <strong>
                    Due Date
                  </strong>

                  <p>
                    {formatDate(
                      assignment.due_date
                    )}
                  </p>

                </div>


                <div>

                  <strong>
                    Posted On
                  </strong>

                  <p>
                    {formatDate(
                      assignment.created_at
                    )}
                  </p>

                </div>

              </div>


              <button
                className="submit-assignment-button"
                onClick={() => {
                  setSelectedAssignment(
                    assignment
                  );

                  setAnswer("");
                  setMessage("");
                }}
              >
                Submit Assignment
              </button>

            </div>

          ))}

        </div>
      )}


      {selectedAssignment && (

        <div className="submission-overlay">

          <div className="submission-modal">

            <button
              className="close-modal"
              onClick={handleCloseModal}
            >
              ×
            </button>


            <h2>
              Submit Assignment
            </h2>


            <h3>
              {selectedAssignment.title}
            </h3>


            <div className="modal-description">

              <p>
                {selectedAssignment.descriptions}
              </p>

            </div>


            <div className="submission-details">

              <p>
                <strong>
                  Due Date:
                </strong>{" "}
                {formatDate(
                  selectedAssignment.due_date
                )}
              </p>


              <p>
                <strong>
                  Maximum Marks:
                </strong>{" "}
                {selectedAssignment.max_marks}
              </p>

            </div>


            {/* TEXT ANSWER */}

            <div className="answer-section">

              <label htmlFor="assignment-answer">
                Your Answer
              </label>

              <textarea
                id="assignment-answer"
                value={answer}
                onChange={(e) =>
                  setAnswer(e.target.value)
                }
                placeholder="Write your answer here..."
                rows="10"
              />

            </div>


            {/* SUBMIT BUTTON */}

            <button
              className="final-submit-button"
              onClick={handleSubmit}
              disabled={submitting}
            >

              {submitting
                ? "Submitting..."
                : "Submit Assignment"}

            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default StudentAssignment;