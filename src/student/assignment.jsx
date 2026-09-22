import Header from "./components/header/header.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import StudentAssignment from "./components/assignment/assignment.jsx";

const StudentAssignmentPage=()=>{
  return(
    <div>
      <Header/>
      <Sidebar/>
      <StudentAssignment/>
    </div>
  )
}

export default StudentAssignmentPage;
