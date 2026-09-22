import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./auth/signin.jsx";
import SignUp from "./auth/signup.jsx";
import StudentDashboard from "./student/dashboard/student.jsx";
import AdminDashboard from "./admin/dashboard.jsx";
import InstructorDashboard from "./instructor/dashboard.jsx";
import Courses from "./student/courses/courses.jsx";
import InstructorCourses from "./instructor/courses.jsx";
import AdminCoursePage from "./admin/courses.jsx";
import StudentSettings from "./student/studentSettings.jsx";
import InstructorAssignmentPage from "./instructor/assignment.jsx";
import InstructorAssignmentSubmissionPage from "./instructor/submissions_page.jsx";
import StudentAssignmentPage from "./student/assignment.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path ="/InstructorDashboard" element={<InstructorDashboard/>}/>
        <Route path="/Courses" element={<Courses/>}/>
        <Route path="/InstructorCourses" element={<InstructorCourses/>}/>
        <Route path="/AdminCoursePage" element={<AdminCoursePage/>}/>
        <Route path ="/StudentSettings" element={<StudentSettings/>}/>
        <Route path ="/InstructorAssignmentPage/:course_id" element = {<InstructorAssignmentPage/>}/>
        <Route
  path="/InstructorAssignment/:course_id/:assignmentId/submissions"
  element={<InstructorAssignmentSubmissionPage />}
/>
        <Route path="/StudentAssignment/:course_id" element ={<StudentAssignmentPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
