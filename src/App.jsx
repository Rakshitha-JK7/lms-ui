import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./auth/signin.jsx";
import SignUp from "./auth/signup.jsx";
import StudentDashboard from "./dashboard/student.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/StudentDashboard" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
