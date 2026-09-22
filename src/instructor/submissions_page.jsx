import Header from "../student/components/header/header";
import InstructorSidebar from "./components/sidebar/sidebar";
import InstructorAssignmentSubmissions from "./components/AssignmentSubmissions/AssignmentSubmissions";

const InstructorAssignmentSubmissionPage =()=>{
  return(
    <div>
      <Header/>
      <InstructorSidebar/>
      <InstructorAssignmentSubmissions/>
    </div>
  )
}

export default InstructorAssignmentSubmissionPage;