import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./auth/signin.jsx";
import SignUp from "./auth/signup.jsx";
import StudentDashboard from "./student/dashboard/student.jsx";
import AdminDashboard from "./admin/dashboard/dashboard.jsx";
import InstructorDashboard from "./instructor/dashboard.jsx";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
