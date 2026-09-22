import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAssignments,
  createAssignment,
  getSingleAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentSubmissions
} from "../../../services/api";

import {
  ClipboardList,
  ChevronRight,
  Plus,
  X,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  Clock
} from "lucide-react";

import "./assignment.css";


const InstructorAssignment = () => {

  const navigate = useNavigate();

  const { course_id } = useParams();

  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("success");

  const [showAssignmentModal, setShowAssignmentModal] =
    useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedAssignmentId, setSelectedAssignmentId] =
    useState(null);


  const [assignmentData, setAssignmentData] = useState({
    title: "",
    descriptions: "",
    due_date: "",
    max_marks: ""
  });

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteAssignmentId, setDeleteAssignmentId] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);


  const [submissionCounts, setSubmissionCounts] =
    useState({});


  useEffect(() => {

    if (course_id) {
      fetchAssignments();
    }

  }, [course_id]);


  const fetchAssignments = async () => {

    try {

      setLoading(true);

      setMessage("");

      const response =
        await getAssignments(course_id);

      console.log(
        "ASSIGNMENTS RESPONSE:",
        response.data
      );

      const data = response.data;

      if (data.status) {

        const assignmentList =
          data.data || [];

        setAssignments(assignmentList);

        await fetchSubmissionCounts(
          assignmentList
        );

      } else {

        setAssignments([]);

        setMessage(
          data.message ||
          "Failed to fetch assignments"
        );

        setMessageType("error");

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

      setAssignments([]);

      setMessage(
        error.response?.data?.message ||
        "Failed to fetch assignments"
      );

      setMessageType("error");

    } finally {

      setLoading(false);

    }

  };


  const fetchSubmissionCounts = async (
    assignmentList
  ) => {

    try {

      const counts = {};

      for (const assignment of assignmentList) {

        try {

          const response =
            await getAssignmentSubmissions(
              course_id,
              assignment.id
            );

          const data = response.data;

          if (data.status) {

            const submissions =
              data.data || [];

            counts[assignment.id] =
              submissions.length;

          } else {

            counts[assignment.id] = 0;

          }

        } catch (error) {

          console.error(
            `SUBMISSION COUNT ERROR FOR ${assignment.id}:`,
            error
          );

          counts[assignment.id] = 0;

        }

      }

      setSubmissionCounts(counts);

    } catch (error) {

      console.error(
        "SUBMISSION COUNTS ERROR:",
        error
      );

    }

  };


  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setAssignmentData(
      (previousData) => ({
        ...previousData,
        [name]: value
      })
    );

  };

  const handleCreateAssignment = () => {

    setEditMode(false);

    setSelectedAssignmentId(null);

    setAssignmentData({
      title: "",
      descriptions: "",
      due_date: "",
      max_marks: ""
    });

    setMessage("");

    setShowAssignmentModal(true);

  };

  const handleEditAssignment = async (
    assignment
  ) => {

    try {

      setMessage("");

      const response =
        await getSingleAssignment(
          course_id,
          assignment.id
        );

      const data = response.data;

      if (data.status) {

        const selected =
          data.data || assignment;

        setAssignmentData({
          title: selected.title || "",
          descriptions:
            selected.descriptions || "",
          due_date:
            formatDateForInput(
              selected.due_date
            ),
          max_marks:
            selected.max_marks || ""
        });

      } else {

        setAssignmentData({
          title: assignment.title || "",
          descriptions:
            assignment.descriptions || "",
          due_date:
            formatDateForInput(
              assignment.due_date
            ),
          max_marks:
            assignment.max_marks || ""
        });

      }

    } catch (error) {

      console.error(
        "GET SINGLE ASSIGNMENT ERROR:",
        error
      );

      setAssignmentData({
        title: assignment.title || "",
        descriptions:
          assignment.descriptions || "",
        due_date:
          formatDateForInput(
            assignment.due_date
          ),
        max_marks:
          assignment.max_marks || ""
      });

    }

    setSelectedAssignmentId(
      assignment.id
    );

    setEditMode(true);

    setShowAssignmentModal(true);

  };

  const formatDateForInput = (date) => {

    if (!date) {
      return "";
    }

    try {

      const parsedDate =
        new Date(date);

      const year =
        parsedDate.getFullYear();

      const month =
        String(
          parsedDate.getMonth() + 1
        ).padStart(2, "0");

      const day =
        String(
          parsedDate.getDate()
        ).padStart(2, "0");

      const hours =
        String(
          parsedDate.getHours()
        ).padStart(2, "0");

      const minutes =
        String(
          parsedDate.getMinutes()
        ).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;

    } catch (error) {

      return "";

    }

  };


  const handleCloseAssignmentModal = () => {

    setShowAssignmentModal(false);

    setEditMode(false);

    setSelectedAssignmentId(null);

    setAssignmentData({
      title: "",
      descriptions: "",
      due_date: "",
      max_marks: ""
    });

  };


  const handleSubmitAssignment = async (e) => {

    e.preventDefault();

    try {

      if (
        !assignmentData.title.trim() ||
        !assignmentData.descriptions.trim() ||
        !assignmentData.due_date ||
        !assignmentData.max_marks
      ) {

        setMessage(
          "Please fill all fields"
        );

        setMessageType("error");

        return;

      }


      let response;


      if (editMode) {

        response =
          await updateAssignment(
            course_id,
            selectedAssignmentId,
            assignmentData.title,
            assignmentData.descriptions,
            assignmentData.due_date,
            assignmentData.max_marks
          );

      }

      else {

        response =
          await createAssignment(
            course_id,
            assignmentData.title,
            assignmentData.descriptions,
            assignmentData.due_date,
            assignmentData.max_marks
          );

      }


      console.log(
        "ASSIGNMENT RESPONSE:",
        response.data
      );


      const data = response.data;


      if (data.status) {

        setMessage(
          editMode
            ? "Assignment updated successfully"
            : "Assignment created successfully"
        );

        setMessageType("success");

        handleCloseAssignmentModal();

        await fetchAssignments();

      } else {

        setMessage(
          data.message ||
          (
            editMode
              ? "Failed to update assignment"
              : "Failed to create assignment"
          )
        );

        setMessageType("error");

      }

    } catch (error) {

      console.error(
        "CREATE / UPDATE ASSIGNMENT ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        (
          editMode
            ? "Failed to update assignment"
            : "Failed to create assignment"
        )
      );

      setMessageType("error");

    }

  };

  const handleDeleteClick = (id) => {

    setDeleteAssignmentId(id);

    setShowDeleteModal(true);

  };


  const handleCloseDeleteModal = () => {

    if (deleteLoading) {
      return;
    }

    setShowDeleteModal(false);

    setDeleteAssignmentId(null);

  };

  const handleDeleteAssignment = async () => {

    try {

      setDeleteLoading(true);

      const response =
        await deleteAssignment(
          course_id,
          deleteAssignmentId
        );

      console.log(
        "DELETE RESPONSE:",
        response.data
      );

      const data = response.data;

      if (data.status) {

        setShowDeleteModal(false);

        setDeleteAssignmentId(null);

        setMessage(
          "Assignment deleted successfully"
        );

        setMessageType("success");

        await fetchAssignments();

      } else {

        setMessage(
          data.message ||
          "Failed to delete assignment"
        );

        setMessageType("error");

      }

    } catch (error) {

      console.error(
        "DELETE ASSIGNMENT ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Failed to delete assignment"
      );

      setMessageType("error");

    } finally {

      setDeleteLoading(false);

    }

  };


  const handleViewSubmissions = (
    assignmentId
  ) => {

    navigate(
      `/InstructorAssignment/${course_id}/${assignmentId}/submissions`
    );

  };

  if (loading) {

    return (

      <main className="assignment-content-page">

        <div className="assignment-loading">

          <div className="assignment-loading-spinner"></div>

          <p>
            Loading assignments...
          </p>

        </div>

      </main>

    );

  }

  return (

    <main className="assignment-content-page">

      <div className="assignment-top">

        <div className="assignment-heading">

          <p className="assignment-label">
            COURSE ASSIGNMENTS
          </p>

          <h1>
            Assignments
          </h1>

          <span>
            Create, manage and review student assignments.
          </span>

        </div>


        <button
          type="button"
          className="create-assignment-button"
          onClick={handleCreateAssignment}
        >

          <Plus size={18} />

          <span>
            Create Assignment
          </span>

        </button>

      </div>

      {message && (

        <div
          className={
            messageType === "error"
              ? "assignment-message assignment-message-error"
              : "assignment-message"
          }
        >

          {message}

        </div>

      )}

      {assignments.length === 0 ? (

        <div className="assignment-empty">

          <div className="assignment-empty-icon-container">

            <ClipboardList
              className="assignment-empty-icon"
              size={40}
            />

          </div>


          <h2>
            No Assignments Created
          </h2>


          <p>
            Create an assignment for students in this course.
          </p>


          <button
            type="button"
            className="assignment-empty-create"
            onClick={handleCreateAssignment}
          >

            <Plus size={16} />

            Create Assignment

          </button>

        </div>

      ) : (

        <div className="assignment-content-list">

          {assignments.map((assignment) => {

            const submitted =
              submissionCounts[
                assignment.id
              ] || 0;


            return (

              <div
                className="assignment-content-box"
                key={assignment.id}
              >


                <div className="assignment-content-left">


                  <div className="assignment-content-icon">

                    <ClipboardList size={22} />

                  </div>


                  <div className="assignment-content-info">

                    <span className="assignment-number">

                      Assignment {assignment.id}

                    </span>


                    <h2>
                      {assignment.title}
                    </h2>


                    <p>
                      Due:{" "}
                      {assignment.due_date
                        ? new Date(
                            assignment.due_date
                          ).toLocaleString()
                        : "Not specified"}
                    </p>

                  </div>

                </div>

                <div className="assignment-submission-info">

                  <div className="submission-count-icon">

                    <Users size={15} />

                  </div>


                  <div>

                    <strong>
                      {submitted}
                    </strong>

                    <span>
                      Submitted
                    </span>

                  </div>

                </div>

                <div className="assignment-actions">


                  <button
                    type="button"
                    className="assignment-submissions-button"
                    onClick={() =>
                      handleViewSubmissions(
                        assignment.id
                      )
                    }
                  >

                    <Users size={16} />

                    Submissions

                  </button>


                  <button
                    type="button"
                    className="assignment-edit-button"
                    onClick={() =>
                      handleEditAssignment(
                        assignment
                      )
                    }
                    title="Edit Assignment"
                  >

                    <Edit size={16} />

                  </button>


                  <button
                    type="button"
                    className="assignment-delete-button"
                    onClick={() =>
                      handleDeleteClick(
                        assignment.id
                      )
                    }
                    title="Delete Assignment"
                  >

                    <Trash2 size={16} />

                  </button>


                  <button
                    type="button"
                    className="assignment-open-button"
                    onClick={() =>
                      handleViewSubmissions(
                        assignment.id
                      )
                    }
                  >

                    Open

                    <ChevronRight size={17} />

                  </button>

                </div>

              </div>

            );

          })}

        </div>

      )}

      {showAssignmentModal && (

        <div
          className="assignment-modal-overlay"
          onClick={
            handleCloseAssignmentModal
          }
        >


          <div
            className="assignment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            <div className="assignment-modal-header">

              <div>

                <h2>

                  {editMode
                    ? "Update Assignment"
                    : "Create Assignment"}

                </h2>


                <p>

                  {editMode
                    ? "Update the assignment details."
                    : "Add a new assignment to this course."}

                </p>

              </div>


              <button
                type="button"
                className="assignment-modal-close"
                onClick={
                  handleCloseAssignmentModal
                }
              >

                <X size={20} />

              </button>

            </div>


            <form
              onSubmit={
                handleSubmitAssignment
              }
            >


              <div className="assignment-form-group">

                <label>
                  Assignment Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    assignmentData.title
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: DBMS Assignment 1"
                  required
                />

              </div>


              <div className="assignment-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="descriptions"
                  value={
                    assignmentData.descriptions
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter assignment instructions..."
                  rows="5"
                  required
                />

              </div>


              <div className="assignment-form-row">


                <div className="assignment-form-group">

                  <label>
                    Due Date
                  </label>

                  <input
                    type="datetime-local"
                    name="due_date"
                    value={
                      assignmentData.due_date
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                </div>


                <div className="assignment-form-group">

                  <label>
                    Maximum Marks
                  </label>

                  <input
                    type="number"
                    name="max_marks"
                    value={
                      assignmentData.max_marks
                    }
                    onChange={
                      handleInputChange
                    }
                    min="1"
                    placeholder="20"
                    required
                  />

                </div>

              </div>


              <div className="assignment-modal-actions">

                <button
                  type="button"
                  className="assignment-cancel-button"
                  onClick={
                    handleCloseAssignmentModal
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="assignment-submit-button"
                >

                  {editMode ? (
                    <Edit size={17} />
                  ) : (
                    <Plus size={17} />
                  )}

                  {editMode
                    ? "Update Assignment"
                    : "Create Assignment"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {showDeleteModal && (

        <div
          className="assignment-delete-overlay"
          onClick={
            handleCloseDeleteModal
          }
        >

          <div
            className="assignment-delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="delete-icon-container">

              <Trash2 size={24} />

            </div>


            <h2>
              Delete Assignment?
            </h2>


            <p>
              This action will permanently delete this
              assignment. Any associated submissions may
              also be affected.
            </p>


            <div className="delete-modal-actions">

              <button
                type="button"
                className="delete-cancel-button"
                onClick={
                  handleCloseDeleteModal
                }
                disabled={deleteLoading}
              >

                Cancel

              </button>


              <button
                type="button"
                className="delete-confirm-button"
                onClick={
                  handleDeleteAssignment
                }
                disabled={deleteLoading}
              >

                {deleteLoading
                  ? "Deleting..."
                  : "Delete Assignment"}

              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );

};


export default InstructorAssignment;