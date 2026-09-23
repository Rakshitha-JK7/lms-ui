import Header from "../student/components/header/header.jsx";
import AdminSidebar from "./components/sidebar/sidebar.jsx";
import AdminSubmission from "./components/submissions/adminsubmissions.jsx";

const AdminSubmissionPage=()=>{
  return(
    <div>
      <Header/>
      <AdminSidebar/>
      <AdminSubmission/>
    </div>
  );
}

export default AdminSubmissionPage;