import Header from "../student/components/header/header";
import InstructorSidebar from "./components/sidebar/sidebar";
import InstructorAssignment from "./components/assignments/assignment.jsx";

const InstructorAssignmentPage =()=>{
  return(
    <div>
      <Header/>
      <InstructorSidebar/>
      <InstructorAssignment/>
    </div>
  )
}

export default InstructorAssignmentPage;