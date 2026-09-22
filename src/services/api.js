import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const UserSignIn = (email, password) =>
  api.post("/user/signin", { email, password });

export const AccessCourses = (id) => 
  api.get(`/course/courses/${id}`);

export const InstuctorCourses =(id)=>
  api.get(`/course/instructorCourses/${id}`);

export const CreateCourse =( instructor_id,dept_id,course_name,course_number)=>
  api.post(`/course/createCourse`,{ instructor_id,
      dept_id,
      course_name,
      course_number});

export const AdminCourses =()=>
  api.get(`/course/adminCourses`);


export const getAssignments = (course_id) => {
  return api.get(
    `/assignment/course/${course_id}/assignment`
  );
};

export const createAssignment = (
  course_id,
  title,
  descriptions,
  due_date,
  max_marks
) => {
  return api.post(
    `/assignment/course/${course_id}/assignment/createassignment`,
    {
      title,
      descriptions,
      due_date,
      max_marks
    }
  );
};

export const getSingleAssignment = (
  course_id,
  assignment_id
) => {
  return api.get(
    `/assignment/course/${course_id}/assignment/${assignment_id}`
  );
};

export const updateAssignment = (
  course_id,
  assignment_id,
  title,
  descriptions,
  due_date,
  max_marks
) => {
  return api.put(
    `/assignment/course/${course_id}/assignment/${assignment_id}`,
    {
      title,
      descriptions,
      due_date,
      max_marks
    }
  );
};

export const deleteAssignment = (
  course_id,
  assignment_id
) => {
  return api.delete(
    `/assignment/course/${course_id}/assignment/${assignment_id}`
  );
};

export const getAssignmentSubmissions = (
  course_id,
  assignment_id
) => {
  return api.get(
    `/assignment/course/${course_id}/assignment/${assignment_id}/submissions`
  );
};

export const submitAssignment = (
  student_id,
  assignment_id,
  file_url
) => {
  return api.post(
    `/assignment/submit/${student_id}`,
    {
      assignment_id,
      file_url
    }
  );
};

export default api;
